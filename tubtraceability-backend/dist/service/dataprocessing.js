"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const mqtt_1 = __importDefault(require("../utility/mqtt"));
const logger_1 = __importDefault(require("../utility/logger"));
const imm2_1 = require("../dataset/imm2");
const imm3_1 = require("../dataset/imm3");
const imm4_1 = require("../dataset/imm4");
const imm5_1 = require("../dataset/imm5");
const imm6_1 = require("../dataset/imm6");
const imm7_1 = require("../dataset/imm7");
const imm8_1 = require("../dataset/imm8");
const imm9_1 = require("../dataset/imm9");
const imm10_1 = require("../dataset/imm10");
const imm2dataprocessing_1 = __importDefault(require("./imm2dataprocessing"));
const imm3dataprocessing_1 = __importDefault(require("./imm3dataprocessing"));
const imm4dataprocessing_1 = __importDefault(require("./imm4dataprocessing"));
const imm5dataprocessing_1 = __importDefault(require("./imm5dataprocessing"));
const imm6dataprocessing_1 = __importDefault(require("./imm6dataprocessing"));
const imm7dataprocessing_1 = __importDefault(require("./imm7dataprocessing"));
const imm8dataprocessing_1 = __importDefault(require("./imm8dataprocessing"));
const imm9dataprocessing_1 = __importDefault(require("./imm9dataprocessing"));
const imm10dataprocessing_1 = __importDefault(require("./imm10dataprocessing"));
const update_1 = require("../controller/db/update");
const dataprocessing = {
    initdataprocessing() {
        logger_1.default.info("Initialize Data Processing Service");
        try {
            const mqttClient = new mqtt_1.default(config_1.config.databus.url, config_1.config.databus.username, config_1.config.databus.password);
            logger_1.default.info("Trying to connect Databus");
            mqttClient.client.on('connect', () => {
                logger_1.default.info("MQTT Client is connected to Databus");
                mqttClient.subscribe(config_1.config.databus.subscribe);
                setTimeout(() => {
                    imm2dataprocessing_1.default.initDataProcessing();
                    imm3dataprocessing_1.default.initDataProcessing();
                    imm4dataprocessing_1.default.initDataProcessing();
                    imm5dataprocessing_1.default.initDataProcessing();
                    imm6dataprocessing_1.default.initDataProcessing();
                    imm7dataprocessing_1.default.initDataProcessing();
                    imm8dataprocessing_1.default.initDataProcessing();
                    imm9dataprocessing_1.default.initDataProcessing();
                    imm10dataprocessing_1.default.initDataProcessing();
                }, 1000);
                setTimeout(() => {
                    messageListener(mqttClient);
                }, 5000);
            });
        }
        catch (error) {
            logger_1.default.error(error);
        }
    }
};
exports.default = dataprocessing;
function messageListener(mqttClient) {
    mqttClient.client.on('message', (topic, data) => {
        const message = JSON.parse(data.toString());
        // Message is consumed every 2 seconds and mapped to imm(x) objects
        // Set imm(x) objects data
        setImmData(message);
    });
}
function setImmData(message) {
    const imms = [imm2_1.imm2, imm3_1.imm3, imm4_1.imm4, imm5_1.imm5, imm6_1.imm6, imm7_1.imm7, imm8_1.imm8, imm9_1.imm9, imm10_1.imm10];
    imms.forEach(imm => {
        for (const key in imm.meta.part) {
            if (imm.meta.part.hasOwnProperty(key)) {
                const id = imm.meta.part[key];
                const matchingVal = message.vals.find(val => val.id === id);
                if (matchingVal) {
                    imm.data.part[key] = matchingVal.val;
                }
            }
        }
        for (const key in imm.meta.scrap) {
            if (imm.meta.scrap.hasOwnProperty(key)) {
                const id = imm.meta.scrap[key];
                const matchingVal = message.vals.find(val => val.id === id);
                if (matchingVal) {
                    imm.data.scrap[key] = matchingVal.val;
                }
            }
        }
        for (const key in imm.meta.energy) {
            if (imm.meta.energy.hasOwnProperty(key)) {
                const id = imm.meta.energy[key];
                const matchingVal = message.vals.find(val => val.id === id);
                if (matchingVal) {
                    imm.data.energy[key] = matchingVal.val;
                }
            }
        }
        for (const key in imm.meta.cycle) {
            if (imm.meta.cycle.hasOwnProperty(key)) {
                const id = imm.meta.cycle[key];
                const matchingVal = message.vals.find(val => val.id === id);
                if (matchingVal) {
                    imm.data.cycle[key] = matchingVal.val;
                }
            }
        }
        for (const key in imm.meta.secondary) {
            if (imm.meta.secondary.hasOwnProperty(key)) {
                const id = imm.meta.secondary[key];
                const matchingVal = message.vals.find(val => val.id === id);
                if (matchingVal) {
                    imm.data.secondary[key] = matchingVal.val;
                }
            }
        }
    });
    const imm2BarcodeReadTime = message.vals.find(obj => obj.id === imm2_1.imm2.meta.part.barcodeReadTime);
    const imm2ScrapBarcode = message.vals.find(obj => obj.id === imm2_1.imm2.meta.scrap.scrapBarcode);
    if (imm2BarcodeReadTime) {
        setTimeout(() => {
            imm2dataprocessing_1.default.startDataProcessing();
        }, 1000);
    }
    if (imm2ScrapBarcode) {
        setTimeout(() => {
            (0, update_1.updateScrapFields)(imm2_1.imm2.data.scrap.scrapBarcode, imm2_1.imm2.data.scrap.scrapBarcode, imm2_1.imm2.data.scrap.scrapReason);
        }, 1000);
    }
    const imm3LastsCycleEndTime = message.vals.find(obj => obj.id === imm3_1.imm3.meta.part.lastCycleEndTime);
    const imm3BarcodeReadTime = message.vals.find(obj => obj.id === imm3_1.imm3.meta.part.barcodeReadTime);
    const imm3ScrapBarcode = message.vals.find(obj => obj.id === imm3_1.imm3.meta.scrap.scrapBarcode);
    if (imm3LastsCycleEndTime) {
        setTimeout(() => {
            imm3dataprocessing_1.default.setPrintData();
        }, 1000);
    }
    if (imm3BarcodeReadTime) {
        setTimeout(() => {
            imm3dataprocessing_1.default.startDataProcessing();
        }, 1000);
    }
    if (imm3ScrapBarcode) {
        setTimeout(() => {
            (0, update_1.updateScrapFields)(imm3_1.imm3.data.scrap.scrapBarcode, imm3_1.imm3.data.scrap.scrapBarcode, imm3_1.imm3.data.scrap.scrapReason);
        }, 1000);
    }
    const imm4LastsCycleEndTime = message.vals.find(obj => obj.id === imm4_1.imm4.meta.part.lastCycleEndTime);
    const imm4BarcodeReadTime = message.vals.find(obj => obj.id === imm4_1.imm4.meta.part.barcodeReadTime);
    const imm4ScrapBarcode = message.vals.find(obj => obj.id === imm4_1.imm4.meta.scrap.scrapBarcode);
    if (imm4LastsCycleEndTime) {
        setTimeout(() => {
            imm4dataprocessing_1.default.setPrintData();
        }, 1000);
    }
    if (imm4BarcodeReadTime) {
        setTimeout(() => {
            imm4dataprocessing_1.default.startDataProcessing();
        }, 1000);
    }
    if (imm4ScrapBarcode) {
        setTimeout(() => {
            (0, update_1.updateScrapFields)(imm4_1.imm4.data.scrap.scrapBarcode, imm4_1.imm4.data.scrap.scrapBarcode, imm4_1.imm4.data.scrap.scrapReason);
        }, 1000);
    }
    const imm5LastsCycleEndTime = message.vals.find(obj => obj.id === imm5_1.imm5.meta.part.lastCycleEndTime);
    const imm5BarcodeReadTime = message.vals.find(obj => obj.id === imm5_1.imm5.meta.part.barcodeReadTime);
    const imm5ScrapBarcode = message.vals.find(obj => obj.id === imm5_1.imm5.meta.scrap.scrapBarcode);
    if (imm5LastsCycleEndTime) {
        setTimeout(() => {
            imm5dataprocessing_1.default.setPrintData();
        }, 1000);
    }
    if (imm5BarcodeReadTime) {
        setTimeout(() => {
            imm5dataprocessing_1.default.startDataProcessing();
        }, 1000);
    }
    if (imm5ScrapBarcode) {
        setTimeout(() => {
            (0, update_1.updateScrapFields)(imm5_1.imm5.data.scrap.scrapBarcode, imm5_1.imm5.data.scrap.scrapBarcode, imm5_1.imm5.data.scrap.scrapReason);
        }, 1000);
    }
    const imm6LastsCycleEndTime = message.vals.find(obj => obj.id === imm6_1.imm6.meta.part.lastCycleEndTime);
    const imm6BarcodeReadTime = message.vals.find(obj => obj.id === imm6_1.imm6.meta.part.barcodeReadTime);
    const imm6ScrapBarcode = message.vals.find(obj => obj.id === imm6_1.imm6.meta.scrap.scrapBarcode);
    if (imm6LastsCycleEndTime) {
        setTimeout(() => {
            imm6dataprocessing_1.default.setPrintData();
        }, 1000);
    }
    if (imm6BarcodeReadTime) {
        setTimeout(() => {
            imm6dataprocessing_1.default.startDataProcessing();
        }, 1000);
    }
    if (imm6ScrapBarcode) {
        setTimeout(() => {
            (0, update_1.updateScrapFields)(imm6_1.imm6.data.scrap.scrapBarcode, imm6_1.imm6.data.scrap.scrapBarcode, imm6_1.imm6.data.scrap.scrapReason);
        }, 1000);
    }
    const imm7LastsCycleEndTime = message.vals.find(obj => obj.id === imm7_1.imm7.meta.part.lastCycleEndTime);
    const imm7BarcodeReadTime = message.vals.find(obj => obj.id === imm7_1.imm7.meta.part.barcodeReadTime);
    const imm7ScrapBarcode = message.vals.find(obj => obj.id === imm7_1.imm7.meta.scrap.scrapBarcode);
    if (imm7LastsCycleEndTime) {
        setTimeout(() => {
            imm7dataprocessing_1.default.setPrintData();
        }, 1000);
    }
    if (imm7BarcodeReadTime) {
        setTimeout(() => {
            imm7dataprocessing_1.default.startDataProcessing();
        }, 1000);
    }
    if (imm7ScrapBarcode) {
        setTimeout(() => {
            (0, update_1.updateScrapFields)(imm7_1.imm7.data.scrap.scrapBarcode, imm7_1.imm7.data.scrap.scrapBarcode, imm7_1.imm7.data.scrap.scrapReason);
        }, 1000);
    }
    const imm8LastsCycleEndTime = message.vals.find(obj => obj.id === imm8_1.imm8.meta.part.lastCycleEndTime);
    const imm8BarcodeReadTime = message.vals.find(obj => obj.id === imm8_1.imm8.meta.part.barcodeReadTime);
    const imm8ScrapBarcode = message.vals.find(obj => obj.id === imm8_1.imm8.meta.scrap.scrapBarcode);
    if (imm8LastsCycleEndTime) {
        setTimeout(() => {
            imm8dataprocessing_1.default.setPrintData();
        }, 1000);
    }
    if (imm8BarcodeReadTime) {
        setTimeout(() => {
            imm8dataprocessing_1.default.startDataProcessing();
        }, 1000);
    }
    if (imm8ScrapBarcode) {
        setTimeout(() => {
            (0, update_1.updateScrapFields)(imm8_1.imm8.data.scrap.scrapBarcode, imm8_1.imm8.data.scrap.scrapBarcode, imm8_1.imm8.data.scrap.scrapReason);
        }, 1000);
    }
    const imm9LastsCycleEndTime = message.vals.find(obj => obj.id === imm9_1.imm9.meta.part.lastCycleEndTime);
    const imm9BarcodeReadTime = message.vals.find(obj => obj.id === imm9_1.imm9.meta.part.barcodeReadTime);
    const imm9ScrapBarcode = message.vals.find(obj => obj.id === imm9_1.imm9.meta.scrap.scrapBarcode);
    if (imm9LastsCycleEndTime) {
        setTimeout(() => {
            imm9dataprocessing_1.default.setPrintData();
        }, 1000);
    }
    if (imm9BarcodeReadTime) {
        setTimeout(() => {
            imm9dataprocessing_1.default.startDataProcessing();
        }, 1000);
    }
    if (imm9ScrapBarcode) {
        setTimeout(() => {
            (0, update_1.updateScrapFields)(imm9_1.imm9.data.scrap.scrapBarcode, imm9_1.imm9.data.scrap.scrapBarcode, imm9_1.imm9.data.scrap.scrapReason);
        }, 1000);
    }
    const imm10LastsCycleEndTime = message.vals.find(obj => obj.id === imm10_1.imm10.meta.part.lastCycleEndTime);
    const imm10BarcodeReadTime = message.vals.find(obj => obj.id === imm10_1.imm10.meta.part.barcodeReadTime);
    const imm10ScrapBarcode = message.vals.find(obj => obj.id === imm10_1.imm10.meta.scrap.scrapBarcode);
    if (imm10LastsCycleEndTime) {
        setTimeout(() => {
            imm10dataprocessing_1.default.setPrintData();
        }, 1000);
    }
    if (imm10BarcodeReadTime) {
        setTimeout(() => {
            imm10dataprocessing_1.default.startDataProcessing();
        }, 1000);
    }
    if (imm10ScrapBarcode) {
        setTimeout(() => {
            (0, update_1.updateScrapFields)(imm10_1.imm10.data.scrap.scrapBarcode, imm10_1.imm10.data.scrap.scrapBarcode, imm10_1.imm10.data.scrap.scrapReason);
        }, 1000);
    }
}
