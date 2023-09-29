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
const imm5_1 = require("../dataset/imm5");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
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
let counter;
// Init Data Processing
const imm5DataProcessing = {
    initDataProcessing() {
        logger_1.default.info('Data processing service is initialized for IMM5');
        (0, read_1.getPrinterConfig)('IMM5', 'inkjet').then(config => {
            inkjetPrinter = new tcp_1.default((config === null || config === void 0 ? void 0 : config.ip) || '', (config === null || config === void 0 ? void 0 : config.port) || 0);
            inkjetPrinter.connect();
            inkjetPrinter.client.on('connect', () => {
                if (!initIsDone) {
                    inkjetPrinter.send(printcommand_1.inkjetResetCommand);
                    initIsDone = true;
                }
            });
        });
        (0, read_1.getPrinterConfig)('IMM5', 'label').then(config => {
            labelPrinter = new tcp_1.default((config === null || config === void 0 ? void 0 : config.ip) || '', (config === null || config === void 0 ? void 0 : config.port) || 0);
            labelPrinter.connect();
        });
        (0, read_1.getLatestUniqueID)('IMM5').then(lastUniqueId => {
            uniqueId = Number(lastUniqueId);
        });
    },
    setPrintData() {
        //Start Timer
        startTimer();
        // Set Next Print Data    
        (0, read_1.getLatestUniqueID)('IMM5').then(lastUniqueId => {
            uniqueId = Number(lastUniqueId);
            counter = 0;
            uniqueIds[0] = uniqueId + 1;
            uniqueIds[1] = uniqueId + 2;
            uniqueId = uniqueId + 2;
            datamatrix[0] = `${platform_1.platform[imm5_1.imm5.data.part.mouldID] || '9'}${uniqueIds[0].toString()}`;
            datamatrix[1] = `${platform_1.platform[imm5_1.imm5.data.part.mouldID] || '9'}${uniqueIds[1].toString()}`;
            imm5_1.imm5.date = imm5_1.imm5.data.part.lastCycleEndTime;
            let printData0 = {
                datamatrix: datamatrix[0],
                machine: imm5_1.imm5.imm,
                mouldDescription: imm5_1.imm5.data.part.mouldDescription,
                date: imm5_1.imm5.data.part.lastCycleEndTime,
                materialNumber: imm5_1.imm5.data.part.materialNumber,
            };
            let printData1 = {
                datamatrix: datamatrix[1],
                machine: imm5_1.imm5.imm,
                mouldDescription: imm5_1.imm5.data.part.mouldDescription,
                date: imm5_1.imm5.data.part.lastCycleEndTime,
                materialNumber: imm5_1.imm5.data.part.materialNumber,
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
        });
    },
    startDataProcessing() {
        if (process) {
            logger_1.default.info('Data processing service is started for IMM5');
            // Stop Timer
            resetTimer();
            // Check barcode
            if (imm5_1.imm5.data.part.barcode !== datamatrix[counter]) {
                logger_1.default.info('Barcode read is failed. Print request is sent to label printer');
                imm5_1.imm5.data.part.barcode = 'ReadError';
                labelPrinter.send(labelCommand[counter]);
            }
            // Set Data
            imm5_1.imm5.uniqueid = uniqueIds[counter];
            imm5_1.imm5.datamatrix = datamatrix[counter];
            // Save Data On DB
            (0, create_1.crateProcessRecord)(imm5_1.imm5);
            // Reset Barcode
            imm5_1.imm5.data.part.barcode = '';
            // Set Counter
            counter = counter + 1;
            // Clear Inkjet Memory
            if (counter === 2) {
                process = false;
                inkjetPrinter.send(printcommand_1.inkjetResetCommand);
            }
        }
    }
};
exports.default = imm5DataProcessing;
function startTimer() {
    timer = setTimeout(() => {
        var _a, _b;
        logger_1.default.info('Barcode reading timeout');
        const inactiveTime = getTimeDifferenceInSeconds((_b = (_a = imm5_1.imm5 === null || imm5_1.imm5 === void 0 ? void 0 : imm5_1.imm5.data) === null || _a === void 0 ? void 0 : _a.part) === null || _b === void 0 ? void 0 : _b.lastCycleEndTime);
        logger_1.default.info('Inactive Duration: ' + inactiveTime);
        const isMachineActive = (inactiveTime < 300 ? true : false) || false;
        if (isMachineActive) {
            logger_1.default.info('Machine is running');
            setTimeout(() => {
                imm5DataProcessing.startDataProcessing();
            }, 1000);
            setTimeout(() => {
                imm5DataProcessing.startDataProcessing();
            }, 3000);
        }
        else {
            logger_1.default.info('Machine is not running');
            inkjetPrinter.send(printcommand_1.inkjetResetCommand);
            process = false;
            resetTimer();
        }
    }, 60000);
}
function resetTimer() {
    clearTimeout(timer);
}
function getTimeDifferenceInSeconds(dateString) {
    const format = 'DD.MM.YYYY HH:mm:ss';
    const targetDate = (0, moment_timezone_1.default)(dateString, format);
    const currentDate = (0, moment_timezone_1.default)();
    const timeDiff = currentDate.diff(targetDate, 'seconds');
    logger_1.default.info("Last Cycle End Data : " + targetDate);
    logger_1.default.info("Current Date : " + currentDate);
    logger_1.default.info("Time Difference : " + timeDiff);
    return timeDiff > 0 ? timeDiff : 0;
}
