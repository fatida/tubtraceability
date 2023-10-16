import TCPClient from "../utility/tcp"
import logger from "../utility/logger"
import { platform } from "../dataset/platform"
import { getPrinterConfig, getLatestUniqueID } from '../controller/db/read'
import { crateProcessRecord } from '../controller/db/create'
import { IPrintData, formatPrintCommand, inkjetResetCommand } from './printerservice'
import { imm9, imm9Reset } from '../dataset/imm9'
import moment from 'moment-timezone';
import opcuaserver from "./opcuaserver"

let uniqueId: number
let inkjetPrinter: TCPClient
let labelPrinter: TCPClient
let initIsDone: boolean = false
let process: boolean = false
let inkjetCommand: string = ''
let labelCommand: string = ''
let timer: NodeJS.Timeout

// Init Data Processing
const imm9DataProcessing = {
    initDataProcessing() {
        logger.info('Data processing service is initialized for IMM9')
        getPrinterConfig('IMM9', 'inkjet').then(config => {
            inkjetPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'INKJET9')
            inkjetPrinter.connect()
            inkjetPrinter.client.on('connect', () => {
                if (!initIsDone) {
                    inkjetPrinter.send(inkjetResetCommand)
                    initIsDone = true
                }
            })
        })

        getPrinterConfig('IMM9', 'label').then(config => {
            labelPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'LABEL9')
            labelPrinter.connect()
        })
    },

    setPrintData() {
        //Start Timer
        startTimer()

        // Set Next Print Data   
        getLatestUniqueID('IMM9').then(lastUniqueId => {
            uniqueId = Number(lastUniqueId)
            uniqueId = uniqueId + 1
            imm9.uniqueid = uniqueId
            imm9.datamatrix = `${platform[imm9.data.part.mouldID] || '9'}${imm9.uniqueid.toString()}`
            imm9.date = imm9.data.part.lastCycleEndTime

            let printData: IPrintData = {
                datamatrix: imm9.datamatrix,
                machine: imm9.imm,
                mouldDescription: imm9.data.part.mouldDescription,
                date: imm9.data.part.lastCycleEndTime,
                materialNumber: imm9.data.part.materialNumber,
            }

            formatPrintCommand(printData)
                .then((printCommand: { inkjet: string, label: string }) => {
                    // Inkjet and Label printers data
                    inkjetCommand = printCommand.inkjet
                    labelCommand = printCommand.label
                    // Send next inkjet print command
                    inkjetPrinter.send(inkjetCommand)
                })
                .catch(error => {
                    logger.error('Failure on formatPrintCommand request :', error)
                })

            // Set process flag
            process = true
        })

    },

    startDataProcessing() {
        if (process) {
            logger.info('Data processing service is started for IMM9')

            // Stop Timer
            resetTimer()

            // Check barcode
            if (imm9.data.part.barcode !== imm9.datamatrix) {
                logger.info(`IMM9 Barcode read is failed. Datamatrix: ${imm9.datamatrix} Barcode: ${imm9.data.part.barcode} Print request is sent to LABEL9 printer`)                
                labelPrinter.send(labelCommand)
            }

            // Save Data on DB
            crateProcessRecord(imm9)

            // Send Data to MES
            opcuaserver.publishImm9(imm9)

            // Reset OPC UA Data
            // setTimeout(() => {
            //     opcuaserver.publishImm9(imm9Reset)
            // }, 2000);

            // Reset Barcode
            imm9.data.part.barcode = ''

            // Clear Inkjet Memory
            inkjetPrinter.send(inkjetResetCommand)

            // Reset process flag
            process = false
        }
    }
}

export default imm9DataProcessing

function startTimer() {
    timer = setTimeout(() => {
        logger.info('IMM9 Barcode reading timeout')
        const inactiveTime = getTimeDifferenceInSeconds(imm9?.data?.part?.lastCycleEndTime)
        const isMachineActive = (inactiveTime < 300 ? true : false) || false

        if (isMachineActive) {
            logger.info('IMM9 is running')
            imm9DataProcessing.startDataProcessing()
        }
        else {
            logger.info('IMM9 is not running')
            inkjetPrinter.send(inkjetResetCommand)
            process = false
            resetTimer()
        }

    }, 60000)
}

function resetTimer() {
    clearTimeout(timer)
}

function getTimeDifferenceInSeconds(dateString: string): number {
    const format = 'DD.MM.YYYY HH:mm:ss'
    const targetDate = moment(dateString, format);
    const currentDate = moment()
    const timeDiff = currentDate.diff(targetDate, 'seconds')
    logger.info("Last Cycle End Data : " + targetDate)
    logger.info("Current Date : " + currentDate)
    logger.info("Time Difference : " + timeDiff)
    return timeDiff > 0 ? timeDiff : 0
}