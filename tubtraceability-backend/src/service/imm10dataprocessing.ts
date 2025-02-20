import TCPClient from "../utility/tcp"
import logger from "../utility/logger"
import { platform } from "../dataset/platform"
import { getPrinterConfig, getLatestUniqueID } from '../controller/db/read'
import { crateProcessRecord } from '../controller/db/create'
import { IPrintData, formatPrintCommand, inkjetResetCommand } from './printerservice'
import { imm10, imm10Reset } from '../dataset/imm10'
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
const imm10DataProcessing = {
    initDataProcessing() {
        logger.info('Data processing service is initialized for IMM10')
        getPrinterConfig('IMM10', 'inkjet').then(config => {
            inkjetPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'INKJET10')
            inkjetPrinter.connect()
            inkjetPrinter.client.on('connect', () => {
                if (!initIsDone) {
                    inkjetPrinter.send(inkjetResetCommand)
                    initIsDone = true
                }
            })
        })

        getPrinterConfig('IMM10', 'label').then(config => {
            labelPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'LABEL10')
            labelPrinter.connect()
        })
    },

    setPrintData() {
        //Start Timer
        startTimer()

        // Set Next Print Data   
        getLatestUniqueID('IMM10').then(lastUniqueId => {
            uniqueId = Number(lastUniqueId)
            uniqueId = uniqueId + 1
            imm10.uniqueid = uniqueId
            imm10.datamatrix = `${platform[imm10.data.part.mouldID] || '9'}${imm10.uniqueid.toString()}`
            imm10.date = imm10.data.part.lastCycleEndTime

            let printData: IPrintData = {
                datamatrix: imm10.datamatrix,
                machine: imm10.imm,
                mouldDescription: imm10.data.part.mouldDescription,
                date: imm10.data.part.lastCycleEndTime,
                materialNumber: imm10.data.part.materialNumber,
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
            logger.info('Data processing service is started for IMM10')

            // Stop Timer
            resetTimer()

            // Check barcode
            if (imm10.data.part.barcode !== imm10.datamatrix) {
                logger.info(`IMM10 Barcode read is failed. Datamatrix: ${imm10.datamatrix} Barcode: ${imm10.data.part.barcode} Print request is sent to LABEL10 printer`)                
                labelPrinter.send(labelCommand)
            }

            // Save Data on DB
            crateProcessRecord(imm10)

            // Send Data to MES
            opcuaserver.publishImm10(imm10)

            // Reset OPC UA Data
            // setTimeout(() => {
            //     opcuaserver.publishImm10(imm10Reset)
            // }, 2000);

            // Reset Barcode
            imm10.data.part.barcode = ''

            // Clear Inkjet Memory
            inkjetPrinter.send(inkjetResetCommand)

            // Reset process flag
            process = false
        }
    }
}

export default imm10DataProcessing

function startTimer() {
    timer = setTimeout(() => {
        logger.info('IMM10 Barcode reading timeout')
        const inactiveTime = getTimeDifferenceInSeconds(imm10?.data?.part?.lastCycleEndTime)
        const isMachineActive = (inactiveTime < 300 ? true : false) || false

        if (isMachineActive) {
            logger.info('IMM10 is running')
            imm10DataProcessing.startDataProcessing()
        }
        else {
            logger.info('IMM10 is not running')
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