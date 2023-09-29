"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utility/logger"));
const mqtt_1 = __importDefault(require("../utility/mqtt"));
const config_1 = require("../config/config");
const opcuaservermeta_1 = require("../dataset/opcuaservermeta");
const opcuaserver = {
    initopcuaserver() {
        logger_1.default.info("OPC UA Server is initialized.");
        try {
            const mqttClient = new mqtt_1.default(config_1.config.opcuaserver.url, config_1.config.opcuaserver.username, config_1.config.opcuaserver.password);
            logger_1.default.info("Trying to connect databus");
            mqttClient.client.on('connect', () => {
                logger_1.default.info("MQTT Client is connected to databus");
                setTimeout(() => {
                    mqttClient.meta(config_1.config.opcuaserver.meta, opcuaservermeta_1.opcuaservermetadata);
                }, 1000);
                setTimeout(() => {
                }, 1000);
            });
        }
        catch (error) {
            logger_1.default.error(error);
        }
    }
};
exports.default = opcuaserver;
