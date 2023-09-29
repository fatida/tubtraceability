"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tcp_1 = __importDefault(require("../utility/tcp"));
const logger_1 = __importDefault(require("../utility/logger"));
const platform_1 = require("../dataset/platform");
const read_1 = require("../controller/db/read");
const create_1 = require("../controller/db/create");
const printcommand_1 = require("./printcommand");
const imm2_1 = require("../dataset/imm2");
let uniqueId;
let inkjetPrinter;
let labelPrinter;
let initIsDone = false;
let process = false;
let timer;
let uniqueIds = [];
let datamatrix = [];
let inkjetCommand = [];
let labelCommand = [];
let counter = 0;
let timeoutCounter = 0;
// Init Data Processing
const imm2DataProcessing = {
    initDataProcessing() {
        logger_1.default.info('Data processing service is initialized for IMM2');
        (0, read_1.getPrinterConfig)('IMM2', 'inkjet').then(config => {
            inkjetPrinter = new tcp_1.default((config === null || config === void 0 ? void 0 : config.ip) || '', (config === null || config === void 0 ? void 0 : config.port) || 0);
            inkjetPrinter.connect();
            inkjetPrinter.client.on('connect', () => {
                if (!initIsDone) {
                    inkjetPrinter.send(printcommand_1.inkjetResetCommand);
                    (0, read_1.getLatestUniqueID)('IMM2').then(lastUniqueId => {
                        uniqueId = Number(lastUniqueId);
                        setTimeout(() => {
                            imm2DataProcessing.setPrintData();
                        }, 1000);
                    });
                    initIsDone = true;
                }
            });
        });
        (0, read_1.getPrinterConfig)('IMM2', 'label').then(config => {
            labelPrinter = new tcp_1.default((config === null || config === void 0 ? void 0 : config.ip) || '', (config === null || config === void 0 ? void 0 : config.port) || 0);
            labelPrinter.connect();
        });
    },
    setPrintData() {
        //Start Timer
        startTimer();
        // Set Next Print Data    
        counter = 0;
        uniqueIds[0] = uniqueId + 1;
        uniqueIds[1] = uniqueId + 2;
        uniqueId = uniqueId + 2;
        datamatrix[0] = `${platform_1.platform[imm2_1.imm2.data.part.mouldID] || '9'}${uniqueIds[0].toString()}`;
        datamatrix[1] = `${platform_1.platform[imm2_1.imm2.data.part.mouldID] || '9'}${uniqueIds[1].toString()}`;
        const now = new Date();
        const formattedDate = now.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        imm2_1.imm2.date = formattedDate;
        let printData0 = {
            datamatrix: datamatrix[0],
            machine: imm2_1.imm2.imm,
            mouldDescription: imm2_1.imm2.data.part.mouldDescription,
            date: formattedDate,
            materialNumber: imm2_1.imm2.data.part.materialNumber,
        };
        let printData1 = {
            datamatrix: datamatrix[1],
            machine: imm2_1.imm2.imm,
            mouldDescription: imm2_1.imm2.data.part.mouldDescription,
            date: formattedDate,
            materialNumber: imm2_1.imm2.data.part.materialNumber,
        };
        (0, printcommand_1.formatPrintCommand)(printData0)
            .then((printCommand) => {
            // Inkjet and Label printers data
            inkjetCommand[0] = printCommand.inkjet;
            labelCommand[0] = printCommand.label;
            // Send next inkjet print command
            inkjetPrinter.send(inkjetCommand[0]);
        })
            .catch(error => {
            logger_1.default.error('Error:', error);
        });
        (0, printcommand_1.formatPrintCommand)(printData1)
            .then((printCommand) => {
            // Inkjet and Label printers data
            inkjetCommand[1] = printCommand.inkjet;
            labelCommand[1] = printCommand.label;
            // Send next inkjet print command
            inkjetPrinter.send(inkjetCommand[1]);
        })
            .catch(error => {
            logger_1.default.error('Error:', error);
        });
        // Set process flag
        process = true;
    },
    startDataProcessing() {
        if (process) {
            logger_1.default.info('Data processing service is started for IMM2');
            // Stop Timer
            resetTimer();
            // Check barcode
            if (imm2_1.imm2.data.part.barcode !== datamatrix[counter]) {
                logger_1.default.info('Barcode read is failed. Print request is sent to label printer');
                imm2_1.imm2.data.part.barcode = 'ReadError';
                labelPrinter.send(labelCommand[counter]);
            }
            // Set Data
            imm2_1.imm2.uniqueid = uniqueIds[counter];
            imm2_1.imm2.datamatrix = datamatrix[counter];
            // Save Data On DB
            (0, create_1.crateProcessRecord)(imm2_1.imm2);
            // Reset Barcode
            imm2_1.imm2.data.part.barcode = '';
            // Set Counter
            counter = counter + 1;
            // Clear Inkjet Memory
            if (counter === 2) {
                process = false;
                inkjetPrinter.send(printcommand_1.inkjetResetCommand);
                imm2DataProcessing.setPrintData();
                //Set Next Print Data
            }
        }
    }
};
exports.default = imm2DataProcessing;
function startTimer() {
    timer = setTimeout(() => {
        logger_1.default.info('Barcode reading timeout');
        const isMachineActive = timeoutCounter < 4 ? true : false;
        if (isMachineActive) {
            logger_1.default.info('Machine is running');
            setTimeout(() => {
                imm2DataProcessing.startDataProcessing();
            }, 1000);
            setTimeout(() => {
                imm2DataProcessing.startDataProcessing();
            }, 3000);
            timeoutCounter = timeoutCounter + 1;
        }
        else {
            logger_1.default.info('Machine is not running');
            timeoutCounter = 0;
            resetTimer();
        }
    }, 300000);
}
function resetTimer() {
    clearTimeout(timer);
}
