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
const mqtt = __importStar(require("mqtt"));
const logger_1 = __importDefault(require("./logger"));
// type Message = {
//   seq: number;
//   vals: {
//     id: number;
//     qc: number;
//     ts: Date;
//     val: number | string;
//   }[];
// };
class MQTTClient {
    constructor(brokerUrl, username, password) {
        this.client = mqtt.connect(brokerUrl, {
            username: username,
            password: password
        });
        this.client.on('connect', () => {
            logger_1.default.info(`Connected to MQTT broker at ${brokerUrl}`);
        });
        this.client.on('error', (error) => {
            logger_1.default.error('Error connecting to MQTT broker:', error);
        });
    }
    subscribe(topic) {
        this.client.subscribe(topic, (error) => {
            if (error) {
                logger_1.default.error('Error subscribing to topic:', error);
            }
            else {
                logger_1.default.info(`Subscribed to topic: ${topic}`);
            }
        });
    }
    publish(topic, message) {
        const data = JSON.stringify(message);
        this.client.publish(topic, data, (error) => {
            if (error) {
                logger_1.default.error('Error publishing message:', error);
            }
            else {
                logger_1.default.info(`Published to topic: ${topic}, message: ${data}`);
            }
        });
    }
    meta(topic, message) {
        const data = JSON.stringify(message);
        this.client.publish(topic, data, (error) => {
            if (error) {
                logger_1.default.error('Error publishing message:', error);
            }
            else {
                logger_1.default.info(`Published to topic: ${topic}, message: ${data}`);
            }
        });
    }
}
exports.default = MQTTClient;
