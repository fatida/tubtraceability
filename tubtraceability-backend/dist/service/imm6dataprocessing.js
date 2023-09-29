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
const imm6_1 = require("../dataset/imm6");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
let uniqueId;
let inkjetPrinter;
let labelPrinter;
let initIsDone = false;
let process = false;
let inkjetCommand = '';
let labelCommand = '';
let timer;
// Init Data Processing
const imm6DataProcessing = {
    initDataProcessing() {
        logger_1.default.info('Data processing service is initialized for IMM6');
        (0, read_1.getPrinterConfig)('IMM6', 'inkjet').then(config => {
            inkjetPrinter = new tcp_1.default((config === null || config === void 0 ? void 0 : config.ip) || '', (config === null || config === void 0 ? void 0 : config.port) || 0);
            inkjetPrinter.connect();
            inkjetPrinter.client.on('connect', () => {
                if (!initIsDone) {
                    inkjetPrinter.send(printcommand_1.inkjetResetCommand);
                    initIsDone = true;
                }
            });
        });
        (0, read_1.getPrinterConfig)('IMM6', 'label').then(config => {
            labelPrinter = new tcp_1.default((config === null || config === void 0 ? void 0 : config.ip) || '', (config === null || config === void 0 ? void 0 : config.port) || 0);
            labelPrinter.connect();
        });
    },
    setPrintData() {
        //Start Timer
        startTimer();
        // Set Next Print Data   
        (0, read_1.getLatestUniqueID)('IMM6').then(lastUniqueId => {
            uniqueId = Number(lastUniqueId);
            uniqueId = uniqueId + 1;
            imm6_1.imm6.uniqueid = uniqueId;
            imm6_1.imm6.datamatrix = `${platform_1.platform[imm6_1.imm6.data.part.mouldID] || '9'}${imm6_1.imm6.uniqueid.toString()}`;
            imm6_1.imm6.date = imm6_1.imm6.data.part.lastCycleEndTime;
            let printData = {
                datamatrix: imm6_1.imm6.datamatrix,
                machine: imm6_1.imm6.imm,
                mouldDescription: imm6_1.imm6.data.part.mouldDescription,
                date: imm6_1.imm6.data.part.lastCycleEndTime,
                materialNumber: imm6_1.imm6.data.part.materialNumber,
            };
            (0, printcommand_1.formatPrintCommand)(printData)
                .then((printCommand) => {
                // Inkjet and Label printers data
                inkjetCommand = printCommand.inkjet;
                labelCommand = printCommand.label;
                // Send next inkjet print command
                inkjetPrinter.send(inkjetCommand);
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
            logger_1.default.info('Data processing service is started for IMM6');
            // Stop Timer
            resetTimer();
            // Check barcode
            if (imm6_1.imm6.data.part.barcode !== imm6_1.imm6.datamatrix) {
                logger_1.default.info('Barcode read is failed. Print request is sent to label printer');
                imm6_1.imm6.data.part.barcode = 'ReadError';
                labelPrinter.send(labelCommand);
            }
            // Save Data on DB
            (0, create_1.crateProcessRecord)(imm6_1.imm6);
            // Reset Barcode
            imm6_1.imm6.data.part.barcode = '';
            // Clear Inkjet Memory
            inkjetPrinter.send(printcommand_1.inkjetResetCommand);
            // Reset process flag
            process = false;
        }
    }
};
exports.default = imm6DataProcessing;
function startTimer() {
    timer = setTimeout(() => {
        var _a, _b;
        logger_1.default.info('Barcode reading timeout');
        const inactiveTime = getTimeDifferenceInSeconds((_b = (_a = imm6_1.imm6 === null || imm6_1.imm6 === void 0 ? void 0 : imm6_1.imm6.data) === null || _a === void 0 ? void 0 : _a.part) === null || _b === void 0 ? void 0 : _b.lastCycleEndTime);
        const isMachineActive = (inactiveTime < 300 ? true : false) || false;
        if (isMachineActive) {
            logger_1.default.info('Machine is running');
            imm6DataProcessing.startDataProcessing();
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
