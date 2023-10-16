import TCPClient from "../utility/tcp"
import logger from "../utility/logger"
import { platform } from "../dataset/platform"
import { getPrinterConfig, getLatestUniqueID } from '../controller/db/read'
import { crateProcessRecord } from '../controller/db/create'
import { IPrintData, formatPrintCommand, inkjetResetCommand } from './printerservice'
import { imm5, imm5Reset } from '../dataset/imm5'
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
const imm5DataProcessing = {

    initDataProcessing() {
        logger.info('Data processing service is initialized for IMM5')

        getPrinterConfig('IMM5', 'inkjet').then(config => {
            inkjetPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'INKJET5')
            inkjetPrinter.connect()
            inkjetPrinter.client.on('connect', () => {
                if (!initIsDone) {
                    inkjetPrinter.send(inkjetResetCommand)
                    initIsDone = true
                }
            })
        })

        getPrinterConfig('IMM5', 'label').then(config => {
            labelPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'LABEL5')
            labelPrinter.connect()
        })

        getLatestUniqueID('IMM5').then(lastUniqueId => {
            uniqueId = Number(lastUniqueId)
        })
    },

    setPrintData() {

        //Start Timer
        startTimer()

        // Set Next Print Data    
        getLatestUniqueID('IMM5').then(lastUniqueId => {

            uniqueId = Number(lastUniqueId)
            counter = 0
            uniqueIds[0] = uniqueId + 1
            uniqueIds[1] = uniqueId + 2
            uniqueId = uniqueId + 2
            datamatrix[0] = `${platform[imm5.data.part.mouldID] || '9'}${uniqueIds[0].toString()}`
            datamatrix[1] = `${platform[imm5.data.part.mouldID] || '9'}${uniqueIds[1].toString()}`
            imm5.date = imm5.data.part.lastCycleEndTime

            let printData0: IPrintData = {
                datamatrix: datamatrix[0],
                machine: imm5.imm,
                mouldDescription: imm5.data.part.mouldDescription,
                date: imm5.data.part.lastCycleEndTime,
                materialNumber: imm5.data.part.materialNumber,
            }

            let printData1: IPrintData = {
                datamatrix: datamatrix[1],
                machine: imm5.imm,
                mouldDescription: imm5.data.part.mouldDescription,
                date: imm5.data.part.lastCycleEndTime,
                materialNumber: imm5.data.part.materialNumber,
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

            logger.info('Data processing service is started for IMM5')

            // Stop Timer
            resetTimer()
            // Check barcode
            if (imm5.data.part.barcode !== datamatrix[counter]) {
                logger.info(`IMM5 Barcode read is failed. Datamatrix: ${datamatrix[counter]} Barcode: ${imm5.data.part.barcode} Print request is sent to LABEL5 printer`)                
                labelPrinter.send(labelCommand[counter])
            }

            // Set Data
            imm5.uniqueid = uniqueIds[counter]
            imm5.datamatrix = datamatrix[counter]

            // Save Data On DB
            crateProcessRecord(imm5)

            // Send Data to MES
            opcuaserver.publishImm5(imm5)

            // Reset OPC UA Data
            // setTimeout(() => {
            //     opcuaserver.publishImm5(imm5Reset)
            // }, 2000);

            // Reset Barcode
            imm5.data.part.barcode = ''

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

export default imm5DataProcessing

function startTimer() {

    timer = setTimeout(() => {
        logger.info('IMM5 Barcode reading timeout')
        const inactiveTime = getTimeDifferenceInSeconds(imm5?.data?.part?.lastCycleEndTime)
        logger.info('Inactive Duration: ' + inactiveTime)
        const isMachineActive = (inactiveTime < 300 ? true : false) || false

        if (isMachineActive) {
            logger.info('IMM5 is running')
            setTimeout(() => {
                imm5DataProcessing.startDataProcessing()
            }, 1000);

            setTimeout(() => {
                imm5DataProcessing.startDataProcessing()
            }, 3000);
        }
        else {
            logger.info('IMM5 is not running')
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