import TCPClient from "../utility/tcp"
import logger from "../utility/logger"
import { platform } from "../dataset/platform"
import { getPrinterConfig, getLatestUniqueID } from '../controller/db/read'
import { crateProcessRecord } from '../controller/db/create'
import { IPrintData, formatPrintCommand, inkjetResetCommand } from './printerservice'
import { imm6 } from '../dataset/imm6'
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
const imm6DataProcessing = {
    initDataProcessing() {
        logger.info('Data processing service is initialized for IMM6')
        getPrinterConfig('IMM6', 'inkjet').then(config => {
            inkjetPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'inkjet6')
            inkjetPrinter.connect()
            inkjetPrinter.client.on('connect', () => {
                if (!initIsDone) {
                    inkjetPrinter.send(inkjetResetCommand)
                    initIsDone = true
                }
            })
        })

        getPrinterConfig('IMM6', 'label').then(config => {
            labelPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'label6')
            labelPrinter.connect()
        })
    },

    setPrintData() {
        //Start Timer
        startTimer()
        
        // Set Next Print Data   
        getLatestUniqueID('IMM6').then(lastUniqueId => {
            uniqueId = Number(lastUniqueId)
            uniqueId = uniqueId + 1
            imm6.uniqueid = uniqueId
            imm6.datamatrix = `${platform[imm6.data.part.mouldID] || '9'}${imm6.uniqueid.toString()}`
            imm6.date = imm6.data.part.lastCycleEndTime

            let printData: IPrintData = {
                datamatrix: imm6.datamatrix,
                machine: imm6.imm,
                mouldDescription: imm6.data.part.mouldDescription,
                date: imm6.data.part.lastCycleEndTime,
                materialNumber: imm6.data.part.materialNumber,
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
                    logger.error('Error:', error)
                })

            // Set process flag
            process = true
        })

    },

    startDataProcessing() {
        if (process) {
            logger.info('Data processing service is started for IMM6')

            // Stop Timer
            resetTimer()

            // Check barcode
            if (imm6.data.part.barcode !== imm6.datamatrix) {
                logger.info('Barcode read is failed. Print request is sent to label printer')
                imm6.data.part.barcode = 'ReadError'
                labelPrinter.send(labelCommand)
            }

            // Save Data on DB
            crateProcessRecord(imm6)
            // Send Data to MES
            opcuaserver.publishImm6(imm6)

            // Reset Barcode
            imm6.data.part.barcode = ''

            // Clear Inkjet Memory
            inkjetPrinter.send(inkjetResetCommand)

            // Reset process flag
            process = false
        }
    }
}

export default imm6DataProcessing

function startTimer() {
    timer = setTimeout(() => {
        logger.info('Barcode reading timeout')
        const inactiveTime = getTimeDifferenceInSeconds(imm6?.data?.part?.lastCycleEndTime)
        const isMachineActive = (inactiveTime < 300 ? true : false) || false

        if (isMachineActive) {
            logger.info('Machine is running')
            imm6DataProcessing.startDataProcessing()
        }
        else {
            logger.info('Machine is not running')
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