"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProcessRecord = exports.getLatestUniqueID = exports.getPrinterConfig = void 0;
const printer_1 = __importDefault(require("../../model/printer"));
const process_1 = __importDefault(require("../../model/process"));
const logger_1 = __importDefault(require("../../utility/logger"));
function getPrinterConfig(imm, type) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const printer = yield printer_1.default.findOne({
                attributes: ['ip', 'port'],
                where: {
                    imm: imm,
                    type: type
                }
            });
            if (printer) {
                logger_1.default.info('Printer configurations: ', printer.toJSON());
                return printer;
            }
            else {
                logger_1.default.warn('Printer configurations not found');
            }
        }
        catch (error) {
            logger_1.default.error('Error:', error);
        }
    });
}
exports.getPrinterConfig = getPrinterConfig;
function getLatestUniqueID(imm) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const latestUniqueID = yield process_1.default.max('uniqueid', {
                where: {
                    imm: imm
                }
            });
            if (latestUniqueID !== null) {
                logger_1.default.info('Latest uniqueid:', latestUniqueID);
                return latestUniqueID;
            }
            else {
                logger_1.default.warn('No record found with imm = "imm10"');
            }
        }
        catch (error) {
            logger_1.default.error('Error:', error);
        }
    });
}
exports.getLatestUniqueID = getLatestUniqueID;
function getProcessRecord(uniqueid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const process = yield process_1.default.findOne({
                where: {
                    uniqueid: uniqueid,
                }
            });
            if (process) {
                logger_1.default.info('Found process record:', process.toJSON());
                return process;
            }
            else {
                logger_1.default.warn('Process record not found');
            }
        }
        catch (error) {
            logger_1.default.error('Error:', error);
        }
    });
}
exports.getProcessRecord = getProcessRecord;
