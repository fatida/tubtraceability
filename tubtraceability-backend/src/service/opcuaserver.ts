import logger from '../utility/logger'
import MQTTClient from '../utility/mqtt'
import { config } from '../config/config'
import { opcuaservermetadata } from '../dataset/opcuaservermeta'
import { IIMM, IMessage } from '../dataset/common'

let mqttClient: MQTTClient
const opcuaserver = {
    initopcuaserver() {
        logger.info("OPC UA Server is initialized.")
        try {
             mqttClient = new MQTTClient(
                config.opcuaserver.url,
                config.opcuaserver.username,
                config.opcuaserver.password
            )
            logger.info("Trying to connect databus")
            mqttClient.client.on('connect', () => {
                logger.info("MQTT Client is connected to databus")

                // Send OPC UA Server Meta Data
                setTimeout(() => {
                    mqttClient.meta(config.opcuaserver.meta, opcuaservermetadata)
                }, 1000);

            });
        } catch (error) {
            logger.error(error)
        }
    },

    publishImm2(imm2: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [
            { id: "101", qc: 2, ts: timestamp, val: imm2?.uniqueid },
            { id: "102", qc: 2, ts: timestamp, val: imm2?.date },
            { id: "103", qc: 2, ts: timestamp, val: imm2?.datamatrix },
            { id: "104", qc: 2, ts: timestamp, val: imm2?.data?.part?.mouldID },
            { id: "105", qc: 2, ts: timestamp, val: imm2?.data?.part?.mouldDescription },
            { id: "106", qc: 2, ts: timestamp, val: imm2?.data?.part?.materialNumber },
            { id: "107", qc: 2, ts: timestamp, val: imm2?.data?.part?.materialDescription },
            { id: "108", qc: 2, ts: timestamp, val: imm2?.data?.scrap?.scrapReason },
            { id: "109", qc: 2, ts: timestamp, val: imm2?.data?.energy?.shiftkWh },
            { id: "110", qc: 2, ts: timestamp, val: imm2?.data?.energy?.shiftkWh_pcs },
            { id: "111", qc: 2, ts: timestamp, val: imm2?.data?.energy?.shiftkWh_kg },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },

    publishImm7(imm7: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [
            { id: "701", qc: 2, ts: timestamp, val: imm7?.uniqueid },
            { id: "702", qc: 2, ts: timestamp, val: imm7?.date },
            { id: "703", qc: 2, ts: timestamp, val: imm7?.datamatrix },
            { id: "704", qc: 2, ts: timestamp, val: imm7?.data?.part?.mouldID },
            { id: "705", qc: 2, ts: timestamp, val: imm7?.data?.part?.mouldDescription },
            { id: "706", qc: 2, ts: timestamp, val: imm7?.data?.part?.materialNumber },
            { id: "707", qc: 2, ts: timestamp, val: imm7?.data?.part?.materialDescription },
            { id: "708", qc: 2, ts: timestamp, val: imm7?.data?.scrap?.scrapReason },
            { id: "709", qc: 2, ts: timestamp, val: imm7?.data?.energy?.shiftkWh },
            { id: "710", qc: 2, ts: timestamp, val: imm7?.data?.energy?.shiftkWh_pcs },
            { id: "711", qc: 2, ts: timestamp, val: imm7?.data?.energy?.shiftkWh_kg },
            { id: "712", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ01 },
            { id: "713", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ02 },
            { id: "714", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ03 },
            { id: "715", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ04 },
            { id: "716", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ05 },
            { id: "717", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ06 },
            { id: "718", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ07 },
            { id: "719", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ08 },
            { id: "720", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ09 },
            { id: "721", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ10 },
            { id: "722", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ11 },
            { id: "723", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ12 },
            { id: "724", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ13 },
            { id: "725", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ14 },
            { id: "726", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ15 },
            { id: "727", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ16 },
            { id: "728", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ17 },
            { id: "729", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ18 },
            { id: "730", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ19 },
            { id: "731", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ20 },
            { id: "732", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ21 },
            { id: "733", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ22 },
            { id: "734", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ23 },
            { id: "735", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempMldZ24 },
            { id: "736", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempBrlZ01 },
            { id: "737", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempBrlZ02 },
            { id: "738", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempBrlZ03 },
            { id: "739", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempBrlZ04 },
            { id: "740", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempBrlZ05 },
            { id: "741", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempBrlZ06 },
            { id: "742", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempBrlZ07 },
            { id: "743", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempBrlZ08 },
            { id: "744", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.tempFlngZ },
            { id: "745", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.cycleTime },
            { id: "746", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.totalCycles },
            { id: "747", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.injTime },
            { id: "748", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.plasTime },
            { id: "749", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.meltCushion },
            { id: "750", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.vpChngOvrPos },
            { id: "751", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.decomStrBfrPlas },
            { id: "752", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.decomStrAftrPlas },
            { id: "753", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.plasStroke },
            { id: "754", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.plasStrokeMax },
            { id: "755", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.plasVelMax },
            { id: "756", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.injVelAvg },
            { id: "757", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.injVelMax },
            { id: "758", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.holdPressureMax },
            { id: "759", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.plasPressureSpecMax },
            { id: "760", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.specPressureTrnsfr },
            { id: "761", qc: 2, ts: timestamp, val: imm7?.data?.cycle?.specPressureMax },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    }


}

export default opcuaserver