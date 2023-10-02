import TCPClient from "../utility/tcp"
import logger from "../utility/logger"
import { platform } from "../dataset/platform"
import { getPrinterConfig, getLatestUniqueID, getProcessRecord } from '../controller/db/read'
import { crateProcessRecord } from '../controller/db/create'
import { IPrintData, formatPrintCommand, inkjetResetCommand } from './printerservice'
import { imm2 } from '../dataset/imm2'
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

let counter: number = 0
let timeoutCounter: number = 0

// Init Data Processing
const imm2DataProcessing = {

    initDataProcessing() {
        logger.info('Data processing service is initialized for IMM2')
        getPrinterConfig('IMM2', 'inkjet').then(config => {
            inkjetPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'inkjet2')
            inkjetPrinter.connect()
            inkjetPrinter.client.on('connect', () => {
                if (!initIsDone) {
                    inkjetPrinter.send(inkjetResetCommand)
                    getLatestUniqueID('IMM2').then(lastUniqueId => {
                        uniqueId = Number(lastUniqueId)
                        setTimeout(() => {
                            imm2DataProcessing.setPrintData()
                        }, 1000);
                    })
                    initIsDone = true
                }
            })
        })

        getPrinterConfig('IMM2', 'label').then(config => {
            labelPrinter = new TCPClient(config?.ip || '', config?.port || 0, 'label2')
            labelPrinter.connect()
        })

    },

    setPrintData() {
        //Start Timer
        startTimer()
        // Set Next Print Data    
        counter = 0
        uniqueIds[0] = uniqueId + 1
        uniqueIds[1] = uniqueId + 2
        uniqueId = uniqueId + 2

        datamatrix[0] = `${platform[imm2.data.part.mouldID] || '9'}${uniqueIds[0].toString()}`
        datamatrix[1] = `${platform[imm2.data.part.mouldID] || '9'}${uniqueIds[1].toString()}`

        const now = new Date();
        const formattedDate = now.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        imm2.date = formattedDate

        let printData0: IPrintData = {
            datamatrix: datamatrix[0],
            machine: imm2.imm,
            mouldDescription: imm2.data.part.mouldDescription,
            date: formattedDate,
            materialNumber: imm2.data.part.materialNumber,
        }

        let printData1: IPrintData = {
            datamatrix: datamatrix[1],
            machine: imm2.imm,
            mouldDescription: imm2.data.part.mouldDescription,
            date: formattedDate,
            materialNumber: imm2.data.part.materialNumber,
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
                logger.error('Error:', error)
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
                logger.error('Error:', error)
            })

        // Set process flag
        process = true
    },

    startDataProcessing() {
        if (process) {
            logger.info('Data processing service is started for IMM2')
            // Stop Timer
            resetTimer()
            // Check barcode
            if (imm2.data.part.barcode !== datamatrix[counter]) {
                logger.info('Barcode read is failed. Print request is sent to label printer')
                imm2.data.part.barcode = 'ReadError'
                labelPrinter.send(labelCommand[counter])
            }

            // Set Data
            imm2.uniqueid = uniqueIds[counter]
            imm2.datamatrix = datamatrix[counter]

            // Save Data On DB
            crateProcessRecord(imm2)

            // Send Data to MES
            opcuaserver.publishImm2(imm2)
            
            // Reset Barcode
            imm2.data.part.barcode = ''

            // Set Counter
            counter = counter + 1

            // Clear Inkjet Memory
            if (counter === 2) {
                process = false
                inkjetPrinter.send(inkjetResetCommand)
                imm2DataProcessing.setPrintData()
                //Set Next Print Data
            }
        }
    }
}

export default imm2DataProcessing

function startTimer() {
    timer = setTimeout(() => {
        logger.info('Barcode reading timeout')

        const isMachineActive = timeoutCounter < 4 ? true : false

        if (isMachineActive) {
            logger.info('Machine is running')
            setTimeout(() => {
                imm2DataProcessing.startDataProcessing()
            }, 1000);

            setTimeout(() => {
                imm2DataProcessing.startDataProcessing()
            }, 3000);

            timeoutCounter = timeoutCounter + 1
        }
        else {
            logger.info('Machine is not running')
            timeoutCounter = 0
            resetTimer()
        }

    }, 300000)
}

function resetTimer() {
    clearTimeout(timer)
}

