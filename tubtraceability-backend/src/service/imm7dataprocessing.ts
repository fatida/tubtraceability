import TCPClient from "../utility/tcp"
import logger from "../utility/logger"
import { platform } from "../dataset/platform"
import { getPrinterConfig, getLatestUniqueID } from '../controller/db/read'
import { crateProcessRecord } from '../controller/db/create'
import { IPrintData, formatPrintCommand, inkjetResetCommand } from './printcommand'
import { imm7 } from '../dataset/imm7'
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
const imm7DataProcessing = {
    initDataProcessing() {
        logger.info('Data processing service is initialized for IMM7')
        getPrinterConfig('IMM7', 'inkjet').then(config => {
            inkjetPrinter = new TCPClient(config?.ip || '', config?.port || 0)
            inkjetPrinter.connect()
            inkjetPrinter.client.on('connect', () => {
                if (!initIsDone) {
                    inkjetPrinter.send(inkjetResetCommand)
                    initIsDone = true
                }
            })
        })

        getPrinterConfig('IMM7', 'label').then(config => {
            labelPrinter = new TCPClient(config?.ip || '', config?.port || 0)
            labelPrinter.connect()
        })
    },

    setPrintData() {
        //Start Timer
        startTimer()
        
        // Set Next Print Data   
        getLatestUniqueID('IMM7').then(lastUniqueId => {
            uniqueId = Number(lastUniqueId)
            uniqueId = uniqueId + 1
            imm7.uniqueid = uniqueId
            imm7.datamatrix = `${platform[imm7.data.part.mouldID] || '9'}${imm7.uniqueid.toString()}`
            imm7.date = imm7.data.part.lastCycleEndTime

            let printData: IPrintData = {
                datamatrix: imm7.datamatrix,
                machine: imm7.imm,
                mouldDescription: imm7.data.part.mouldDescription,
                date: imm7.data.part.lastCycleEndTime,
                materialNumber: imm7.data.part.materialNumber,
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
            logger.info('Data processing service is started for IMM7')

            // Stop Timer
            resetTimer()

            // Check barcode
            if (imm7.data.part.barcode !== imm7.datamatrix) {
                logger.info('Barcode read is failed. Print request is sent to label printer')
                imm7.data.part.barcode = 'ReadError'
                labelPrinter.send(labelCommand)
            }

            // Save Data on DB
            crateProcessRecord(imm7)

            // Reset Barcode
            imm7.data.part.barcode = ''

            // Clear Inkjet Memory
            inkjetPrinter.send(inkjetResetCommand)

            // Reset process flag
            process = false
        }
    }
}

export default imm7DataProcessing

function startTimer() {
    timer = setTimeout(() => {
        logger.info('Barcode reading timeout')
        const inactiveTime = getTimeDifferenceInSeconds(imm7?.data?.part?.lastCycleEndTime)
        const isMachineActive = (inactiveTime < 300 ? true : false) || false

        if (isMachineActive) {
            logger.info('Machine is running')
            imm7DataProcessing.startDataProcessing()
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