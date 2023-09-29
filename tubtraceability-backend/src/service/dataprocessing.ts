import { config } from '../config/config'
import MQTTClient from '../utility/mqtt'
import logger from '../utility/logger'
import { IIMM, IMessage } from '../dataset/common'
import { imm2 } from '../dataset/imm2'
import { imm3 } from '../dataset/imm3'
import { imm4 } from '../dataset/imm4'
import { imm5 } from '../dataset/imm5'
import { imm6 } from '../dataset/imm6'
import { imm7 } from '../dataset/imm7'
import { imm8 } from '../dataset/imm8'
import { imm9 } from '../dataset/imm9'
import { imm10 } from '../dataset/imm10'
import imm2DataProcessing from './imm2dataprocessing'
import imm3DataProcessing from './imm3dataprocessing'
import imm4DataProcessing from './imm4dataprocessing'
import imm5DataProcessing from './imm5dataprocessing'
import imm6DataProcessing from './imm6dataprocessing'
import imm7DataProcessing from './imm7dataprocessing'
import imm8DataProcessing from './imm8dataprocessing'
import imm9DataProcessing from './imm9dataprocessing'
import imm10DataProcessing from './imm10dataprocessing'
import { updateScrapFields } from '../controller/db/update'


const dataprocessing = {
    initdataprocessing() {
        logger.info("Initialize Data Processing Service")
        try {
            const mqttClient = new MQTTClient(
                config.databus.url,
                config.databus.username,
                config.databus.password
            )
            logger.info("Trying to connect Databus")
            mqttClient.client.on('connect', () => {
                logger.info("MQTT Client is connected to Databus")
                mqttClient.subscribe(config.databus.subscribe)

                setTimeout(() => {
                    imm2DataProcessing.initDataProcessing()
                    imm3DataProcessing.initDataProcessing()
                    imm4DataProcessing.initDataProcessing()
                    imm5DataProcessing.initDataProcessing()
                    imm6DataProcessing.initDataProcessing()
                    imm7DataProcessing.initDataProcessing()
                    imm8DataProcessing.initDataProcessing()
                    imm9DataProcessing.initDataProcessing()
                    imm10DataProcessing.initDataProcessing()
                }, 1000);

                setTimeout(() => {
                    messageListener(mqttClient)
                }, 5000 );

            });
        } catch (error) {
            logger.error(error)
        }
    }
}
export default dataprocessing


function messageListener(mqttClient: MQTTClient) {

    mqttClient.client.on('message', (topic, data) => {
        const message: IMessage = JSON.parse(data.toString());
        // Message is consumed every 2 seconds and mapped to imm(x) objects
        // Set imm(x) objects data
        setImmData(message)
    });
}


function setImmData(message: IMessage) {

    const imms: IIMM[] = [imm2, imm3, imm4, imm5, imm6, imm7, imm8, imm9, imm10]
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
    })

    const imm2BarcodeReadTime = message.vals.find(obj => obj.id === imm2.meta.part.barcodeReadTime)
    const imm2ScrapBarcode = message.vals.find(obj => obj.id === imm2.meta.scrap.scrapBarcode)

    if (imm2BarcodeReadTime) {
        setTimeout(() => {
            imm2DataProcessing.startDataProcessing()
        }, 1000);
    }

    if (imm2ScrapBarcode) {
        setTimeout(() => {
            updateScrapFields(imm2.data.scrap.scrapBarcode, imm2.data.scrap.scrapBarcode, imm2.data.scrap.scrapReason)
        }, 1000);
    }

    const imm3LastsCycleEndTime = message.vals.find(obj => obj.id === imm3.meta.part.lastCycleEndTime)
    const imm3BarcodeReadTime = message.vals.find(obj => obj.id === imm3.meta.part.barcodeReadTime)
    const imm3ScrapBarcode = message.vals.find(obj => obj.id === imm3.meta.scrap.scrapBarcode)

    if (imm3LastsCycleEndTime) {
        setTimeout(() => {
            imm3DataProcessing.setPrintData()
        }, 1000);
    }

    if (imm3BarcodeReadTime) {
        setTimeout(() => {
            imm3DataProcessing.startDataProcessing()
        }, 1000);
    }

    if (imm3ScrapBarcode) {
        setTimeout(() => {
            updateScrapFields(imm3.data.scrap.scrapBarcode, imm3.data.scrap.scrapBarcode, imm3.data.scrap.scrapReason)
        }, 1000);
    }


    const imm4LastsCycleEndTime = message.vals.find(obj => obj.id === imm4.meta.part.lastCycleEndTime)
    const imm4BarcodeReadTime = message.vals.find(obj => obj.id === imm4.meta.part.barcodeReadTime)
    const imm4ScrapBarcode = message.vals.find(obj => obj.id === imm4.meta.scrap.scrapBarcode)

    if (imm4LastsCycleEndTime) {
        setTimeout(() => {
            imm4DataProcessing.setPrintData()
        }, 1000);
    }

    if (imm4BarcodeReadTime) {
        setTimeout(() => {
            imm4DataProcessing.startDataProcessing()
        }, 1000);
    }

    if (imm4ScrapBarcode) {
        setTimeout(() => {
            updateScrapFields(imm4.data.scrap.scrapBarcode, imm4.data.scrap.scrapBarcode, imm4.data.scrap.scrapReason)
        }, 1000);
    }

    const imm5LastsCycleEndTime = message.vals.find(obj => obj.id === imm5.meta.part.lastCycleEndTime)
    const imm5BarcodeReadTime = message.vals.find(obj => obj.id === imm5.meta.part.barcodeReadTime)
    const imm5ScrapBarcode = message.vals.find(obj => obj.id === imm5.meta.scrap.scrapBarcode)

    if (imm5LastsCycleEndTime) {
        setTimeout(() => {
            imm5DataProcessing.setPrintData()
        }, 1000);
    }

    if (imm5BarcodeReadTime) {
        setTimeout(() => {
            imm5DataProcessing.startDataProcessing()
        }, 1000);
    }

    if (imm5ScrapBarcode) {
        setTimeout(() => {
            updateScrapFields(imm5.data.scrap.scrapBarcode, imm5.data.scrap.scrapBarcode, imm5.data.scrap.scrapReason)
        }, 1000);
    }


    const imm6LastsCycleEndTime = message.vals.find(obj => obj.id === imm6.meta.part.lastCycleEndTime)
    const imm6BarcodeReadTime = message.vals.find(obj => obj.id === imm6.meta.part.barcodeReadTime)
    const imm6ScrapBarcode = message.vals.find(obj => obj.id === imm6.meta.scrap.scrapBarcode)

    if (imm6LastsCycleEndTime) {
        setTimeout(() => {
            imm6DataProcessing.setPrintData()
        }, 1000);
    }

    if (imm6BarcodeReadTime) {
        setTimeout(() => {
            imm6DataProcessing.startDataProcessing()
        }, 1000);
    }

    if (imm6ScrapBarcode) {
        setTimeout(() => {
            updateScrapFields(imm6.data.scrap.scrapBarcode, imm6.data.scrap.scrapBarcode, imm6.data.scrap.scrapReason)
        }, 1000);
    }

    const imm7LastsCycleEndTime = message.vals.find(obj => obj.id === imm7.meta.part.lastCycleEndTime)
    const imm7BarcodeReadTime = message.vals.find(obj => obj.id === imm7.meta.part.barcodeReadTime)
    const imm7ScrapBarcode = message.vals.find(obj => obj.id === imm7.meta.scrap.scrapBarcode)

    if (imm7LastsCycleEndTime) {
        setTimeout(() => {
            imm7DataProcessing.setPrintData()
        }, 1000);
    }

    if (imm7BarcodeReadTime) {
        setTimeout(() => {
            imm7DataProcessing.startDataProcessing()
        }, 1000);
    }

    if (imm7ScrapBarcode) {
        setTimeout(() => {
            updateScrapFields(imm7.data.scrap.scrapBarcode, imm7.data.scrap.scrapBarcode, imm7.data.scrap.scrapReason)
        }, 1000);
    }

    const imm8LastsCycleEndTime = message.vals.find(obj => obj.id === imm8.meta.part.lastCycleEndTime)
    const imm8BarcodeReadTime = message.vals.find(obj => obj.id === imm8.meta.part.barcodeReadTime)
    const imm8ScrapBarcode = message.vals.find(obj => obj.id === imm8.meta.scrap.scrapBarcode)

    if (imm8LastsCycleEndTime) {
        setTimeout(() => {
            imm8DataProcessing.setPrintData()
        }, 1000);
    }

    if (imm8BarcodeReadTime) {
        setTimeout(() => {
            imm8DataProcessing.startDataProcessing()
        }, 1000);
    }

    if (imm8ScrapBarcode) {
        setTimeout(() => {
            updateScrapFields(imm8.data.scrap.scrapBarcode, imm8.data.scrap.scrapBarcode, imm8.data.scrap.scrapReason)
        }, 1000);
    }

    const imm9LastsCycleEndTime = message.vals.find(obj => obj.id === imm9.meta.part.lastCycleEndTime)
    const imm9BarcodeReadTime = message.vals.find(obj => obj.id === imm9.meta.part.barcodeReadTime)
    const imm9ScrapBarcode = message.vals.find(obj => obj.id === imm9.meta.scrap.scrapBarcode)

    if (imm9LastsCycleEndTime) {
        setTimeout(() => {
            imm9DataProcessing.setPrintData()
        }, 1000);
    }

    if (imm9BarcodeReadTime) {
        setTimeout(() => {
            imm9DataProcessing.startDataProcessing()
        }, 1000);
    }

    if (imm9ScrapBarcode) {
        setTimeout(() => {
            updateScrapFields(imm9.data.scrap.scrapBarcode, imm9.data.scrap.scrapBarcode, imm9.data.scrap.scrapReason)
        }, 1000);
    }

    const imm10LastsCycleEndTime = message.vals.find(obj => obj.id === imm10.meta.part.lastCycleEndTime)
    const imm10BarcodeReadTime = message.vals.find(obj => obj.id === imm10.meta.part.barcodeReadTime)
    const imm10ScrapBarcode = message.vals.find(obj => obj.id === imm10.meta.scrap.scrapBarcode)

    if (imm10LastsCycleEndTime) {
        setTimeout(() => {
            imm10DataProcessing.setPrintData()
        }, 1000);
    }

    if (imm10BarcodeReadTime) {
        setTimeout(() => {
            imm10DataProcessing.startDataProcessing()
        }, 1000);
    }

    if (imm10ScrapBarcode) {
        setTimeout(() => {
            updateScrapFields(imm10.data.scrap.scrapBarcode, imm10.data.scrap.scrapBarcode, imm10.data.scrap.scrapReason)
        }, 1000);
    }




}