import TCPClient from "../utility/tcp"
import logger from "../utility/logger"
import { platform } from "../dataset/platform"
import { getPrinterConfig, getLatestUniqueID } from '../controller/db/read'
import { crateProcessRecord } from '../controller/db/create'
import { IPrintData, formatPrintCommand, inkjetResetCommand } from './printerservice'
import { imm3, imm3Reset } from '../dataset/imm3'
import moment from 'moment-timezone';
import opcuaserver from "./opcuaserver"

let uniqueId: number
let inkjetPrinter: TCPClient
let labelPrinter: TCPClient
let initIsDone: boolean = false
let process: boolean = false
let timer: NodeJS.Timeout
let uniqueIds: number[] = []
let datamatrix: string[] = []
let inkjetCommand: string[] = []
let labelCommand: string[] = []
let counter: number

// Init Data Processing
const imm3DataProcessing = {

    initDataProcessing() {
        logger.info('Data processing service is initialized for IMM3')

        getPrinterConfig('IMM3', 'inkjet').then(config => {
            inkjetPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'INKJET3')
            inkjetPrinter.connect()
            inkjetPrinter.client.on('connect', () => {
                if (!initIsDone) {
                    inkjetPrinter.send(inkjetResetCommand)
                    initIsDone = true
                }
            })
        })

        getPrinterConfig('IMM3', 'label').then(config => {
            labelPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'LABEL3')
            labelPrinter.connect()
        })

        getLatestUniqueID('IMM3').then(lastUniqueId => {
            uniqueId = Number(lastUniqueId)
        })
    },

    setPrintData() {

        //Start Timer
        startTimer()

        // Set Next Print Data    
        getLatestUniqueID('IMM3').then(lastUniqueId => {

            uniqueId = Number(lastUniqueId)
            counter = 0
            uniqueIds[0] = uniqueId + 1
            uniqueIds[1] = uniqueId + 2
            uniqueId = uniqueId + 2
            datamatrix[0] = `${platform[imm3.data.part.mouldID] || '9'}${uniqueIds[0].toString()}`
            datamatrix[1] = `${platform[imm3.data.part.mouldID] || '9'}${uniqueIds[1].toString()}`
            imm3.date = imm3.data.part.lastCycleEndTime

            let printData0: IPrintData = {
                datamatrix: datamatrix[0],
                machine: imm3.imm,
                mouldDescription: imm3.data.part.mouldDescription,
                date: imm3.data.part.lastCycleEndTime,
                materialNumber: imm3.data.part.materialNumber,
            }

            let printData1: IPrintData = {
                datamatrix: datamatrix[1],
                machine: imm3.imm,
                mouldDescription: imm3.data.part.mouldDescription,
                date: imm3.data.part.lastCycleEndTime,
                materialNumber: imm3.data.part.materialNumber,
            }

            formatPrintCommand(printData0)
                .then((printCommand: { inkjet: string, label: string }) => {
                    // Inkjet and Label printers data
                    inkjetCommand[0] = printCommand.inkjet
                    labelCommand[0] = printCommand.label
                    // Send next inkjet print command
                    inkjetPrinter.send(inkjetCommand[0])
                })
                .catch(error => {
                    logger.error('Failure on formatPrintCommand request :', error)
                })

            formatPrintCommand(printData1)
                .then((printCommand: { inkjet: string, label: string }) => {
                    // Inkjet and Label printers data
                    inkjetCommand[1] = printCommand.inkjet
                    labelCommand[1] = printCommand.label
                    // Send next inkjet print command
                    inkjetPrinter.send(inkjetCommand[1])
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

            logger.info('Data processing service is started for IMM3')

            // Stop Timer
            resetTimer()
            // Check barcode
            if (imm3.data.part.barcode !== datamatrix[counter]) {
                logger.info('Barcode read is failed. Print request is sent to label printer')
                imm3.data.part.barcode = 'ReadError'
                labelPrinter.send(labelCommand[counter])
            }

            // Set Data
            imm3.uniqueid = uniqueIds[counter]
            imm3.datamatrix = datamatrix[counter]

            // Save Data On DB
            crateProcessRecord(imm3)

            // Send Data to MES
            opcuaserver.publishImm3(imm3)

            // Reset OPC UA Data
            setTimeout(() => {
                opcuaserver.publishImm3(imm3Reset)
            }, 2000);

            // Reset Barcode
            imm3.data.part.barcode = ''

            // Set Counter
            counter = counter + 1

            // Clear Inkjet Memory
            if (counter === 2) {
                process = false
                inkjetPrinter.send(inkjetResetCommand)
            }
        }
    }
}

export default imm3DataProcessing

function startTimer() {

    timer = setTimeout(() => {
        logger.info('Barcode reading timeout')
        const inactiveTime = getTimeDifferenceInSeconds(imm3?.data?.part?.lastCycleEndTime)
        logger.info('Inactive Duration: ' + inactiveTime)
        const isMachineActive = (inactiveTime < 300 ? true : false) || false

        if (isMachineActive) {
            logger.info('Machine is running')
            setTimeout(() => {
                imm3DataProcessing.startDataProcessing()
            }, 1000);

            setTimeout(() => {
                imm3DataProcessing.startDataProcessing()
            }, 3000);
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