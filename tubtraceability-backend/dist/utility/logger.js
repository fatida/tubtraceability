"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const logsDirectory = path_1.default.join(__dirname, '..', 'logs');
const transport = new winston_daily_rotate_file_1.default({
    filename: path_1.default.join(logsDirectory, 'application-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH-MM',
    zippedArchive: false,
    maxSize: '10m',
    maxFiles: '14d'
});
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.label({ label: 'tubtraceability' }), winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Specify your desired timestamp format
    winston_1.format.printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
    })),
    transports: [
        new winston_1.transports.Console(),
        transport
    ]
});
logger.add(new winston_1.transports.File({
    filename: path_1.default.join(logsDirectory, 'error.log'),
    level: 'error'
}));
exports.default = logger;
