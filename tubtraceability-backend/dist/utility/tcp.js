"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const net = __importStar(require("net"));
const logger_1 = __importDefault(require("./logger"));
class TCPClient {
    constructor(host, port) {
        this.isConnected = false;
        this.host = host;
        this.port = port;
        this.client = new net.Socket();
        this.client.on('connect', this.onConnect.bind(this));
        this.client.on('data', this.onData.bind(this));
        this.client.on('close', this.onClose.bind(this));
        this.client.on('error', this.onError.bind(this));
    }
    onConnect() {
        this.isConnected = true;
        logger_1.default.info(`Connected to ${this.host}:${this.port}`);
    }
    onData(data) {
        const message = data.toString();
        logger_1.default.info(`Received message: ${message}`);
    }
    onClose() {
        this.client.destroy();
        this.isConnected = false;
        logger_1.default.info(`Disconnected from ${this.host}:${this.port}`);
        this.reconnect();
    }
    onError(error) {
        logger_1.default.error(`Error: ${error.message}`);
        this.client.destroy();
    }
    reconnect() {
        setTimeout(() => {
            if (!this.isConnected) {
                logger_1.default.info(`Reconnecting to ${this.host}:${this.port}`);
                this.client.connect(this.port, this.host);
            }
        }, 60000); // Retry every 60 seconds
    }
    connect() {
        this.client.connect(this.port, this.host);
    }
    send(message) {
        if (this.isConnected) {
            this.client.write(message);
        }
        else {
            logger_1.default.error('Client is not connected');
        }
    }
    disconnect() {
        this.client.end();
    }
}
exports.default = TCPClient;
