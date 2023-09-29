import TCPClient from "../utility/tcp"
import logger from "../utility/logger"
import { platform } from "../dataset/platform"
import { getPrinterConfig, getLatestUniqueID } from '../controller/db/read'
import { crateProcessRecord } from '../controller/db/create'
import { IPrintData, formatPrintCommand, inkjetResetCommand } from './printcommand'
import { imm8 } from '../dataset/imm8'
import moment from 'moment-timezone';

let uniqueId: number
let inkjetPrinter: TCPClient
let labelPrinter: TCPClient
let initIsDone: boolean = false
let process: boolean = false
let inkjetCommand: string = ''
let labelCommand: string = ''
let timer: NodeJS.Timeout

// Init Data Processing
const imm8DataProcessing = {
    initDataProcessing() {
        logger.info('Data processing service is initialized for IMM8')
        getPrinterConfig('IMM8', 'inkjet').then(config => {
            inkjetPrinter = new TCPClient(config?.ip || '', config?.port || 0)
            inkjetPrinter.connect()
            inkjetPrinter.client.on('connect', () => {
                if (!initIsDone) {
                    inkjetPrinter.send(inkjetResetCommand)
                    initIsDone = true
                }
            })
        })

        getPrinterConfig('IMM8', 'label').then(config => {
            labelPrinter = new TCPClient(config?.ip || '', config?.port || 0)
            labelPrinter.connect()
        })
    },

    setPrintData() {
        //Start Timer
        startTimer()
        
        // Set Next Print Data   
        getLatestUniqueID('IMM8').then(lastUniqueId => {
            uniqueId = Number(lastUniqueId)
            uniqueId = uniqueId + 1
            imm8.uniqueid = uniqueId
            imm8.datamatrix = `${platform[imm8.data.part.mouldID] || '9'}${imm8.uniqueid.toString()}`
            imm8.date = imm8.data.part.lastCycleEndTime

            let printData: IPrintData = {
                datamatrix: imm8.datamatrix,
                machine: imm8.imm,
                mouldDescription: imm8.data.part.mouldDescription,
                date: imm8.data.part.lastCycleEndTime,
                materialNumber: imm8.data.part.materialNumber,
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
            logger.info('Data processing service is started for IMM8')

            // Stop Timer
            resetTimer()

            // Check barcode
            if (imm8.data.part.barcode !== imm8.datamatrix) {
                logger.info('Barcode read is failed. Print request is sent to label printer')
                imm8.data.part.barcode = 'ReadError'
                labelPrinter.send(labelCommand)
            }

            // Save Data on DB
            crateProcessRecord(imm8)

            // Reset Barcode
            imm8.data.part.barcode = ''

            // Clear Inkjet Memory
            inkjetPrinter.send(inkjetResetCommand)

            // Reset process flag
            process = false
        }
    }
}

export default imm8DataProcessing

function startTimer() {
    timer = setTimeout(() => {
        logger.info('Barcode reading timeout')
        const inactiveTime = getTimeDifferenceInSeconds(imm8?.data?.part?.lastCycleEndTime)
        const isMachineActive = (inactiveTime < 300 ? true : false) || false

        if (isMachineActive) {
            logger.info('Machine is running')
            imm8DataProcessing.startDataProcessing()
        }
        else {
            logger.info('Machine is not running')
            inkjetPrinter.send(inkjetResetCommand)
            process = false
            resetTimer()
        }

    }, 6000)
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