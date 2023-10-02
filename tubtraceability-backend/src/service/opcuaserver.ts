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
            { id: "201", qc: 3, ts: timestamp, val: imm2?.uniqueid },
            { id: "202", qc: 3, ts: timestamp, val: imm2?.date },
            { id: "203", qc: 3, ts: timestamp, val: imm2?.datamatrix },
            { id: "204", qc: 3, ts: timestamp, val: imm2?.data?.part?.mouldID },
            { id: "205", qc: 3, ts: timestamp, val: imm2?.data?.part?.mouldDescription },
            { id: "206", qc: 3, ts: timestamp, val: imm2?.data?.part?.materialNumber },
            { id: "207", qc: 3, ts: timestamp, val: imm2?.data?.part?.materialDescription },
            { id: "208", qc: 3, ts: timestamp, val: imm2?.data?.scrap?.scrapReason },
            { id: "209", qc: 3, ts: timestamp, val: imm2?.data?.energy?.shiftkWh },
            { id: "210", qc: 3, ts: timestamp, val: imm2?.data?.energy?.shiftkWh_pcs },
            { id: "211", qc: 3, ts: timestamp, val: imm2?.data?.energy?.shiftkWh_kg },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },
    publishImm2Scrap(imm2: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [

            { id: "212", qc: 3, ts: timestamp, val: imm2?.data?.scrap?.scrapBarcode },
            { id: "202", qc: 3, ts: timestamp, val: imm2?.data?.scrap?.scrapReason },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },

    publishImm3(imm3: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [
            { id: "301", qc: 3, ts: timestamp, val: imm3?.uniqueid },
            { id: "302", qc: 3, ts: timestamp, val: imm3?.date },
            { id: "303", qc: 3, ts: timestamp, val: imm3?.datamatrix },
            { id: "304", qc: 3, ts: timestamp, val: imm3?.data?.part?.mouldID },
            { id: "305", qc: 3, ts: timestamp, val: imm3?.data?.part?.mouldDescription },
            { id: "306", qc: 3, ts: timestamp, val: imm3?.data?.part?.materialNumber },
            { id: "307", qc: 3, ts: timestamp, val: imm3?.data?.part?.materialDescription },
            { id: "308", qc: 3, ts: timestamp, val: imm3?.data?.scrap?.scrapReason },
            { id: "309", qc: 3, ts: timestamp, val: imm3?.data?.energy?.shiftkWh },
            { id: "310", qc: 3, ts: timestamp, val: imm3?.data?.energy?.shiftkWh_pcs },
            { id: "311", qc: 3, ts: timestamp, val: imm3?.data?.energy?.shiftkWh_kg },
            { id: "312", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ01 },
            { id: "313", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ02 },
            { id: "314", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ03 },
            { id: "315", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ04 },
            { id: "316", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ05 },
            { id: "317", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ06 },
            { id: "318", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ07 },
            { id: "319", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ08 },
            { id: "320", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ09 },
            { id: "321", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ10 },
            { id: "322", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ11 },
            { id: "323", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ12 },
            { id: "324", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ13 },
            { id: "325", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ14 },
            { id: "326", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ15 },
            { id: "327", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ16 },
            { id: "328", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ17 },
            { id: "329", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ18 },
            { id: "330", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ19 },
            { id: "331", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ20 },
            { id: "332", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ21 },
            { id: "333", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ22 },
            { id: "334", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ23 },
            { id: "335", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ24 },
            { id: "336", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ25 },
            { id: "337", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ26 },
            { id: "338", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ27 },
            { id: "339", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ28 },
            { id: "340", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ29 },
            { id: "341", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ30 },
            { id: "342", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ31 },
            { id: "343", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ32 },
            { id: "344", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ33 },
            { id: "345", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ34 },
            { id: "346", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ35 },
            { id: "347", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempMldZ36 },
            { id: "348", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempBrlZ01 },
            { id: "349", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempBrlZ02 },
            { id: "350", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempBrlZ03 },
            { id: "351", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempBrlZ04 },
            { id: "352", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempBrlZ05 },
            { id: "353", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempBrlZ06 },
            { id: "354", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempBrlZ07 },
            { id: "355", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempBrlZ09 },
            { id: "356", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.tempBrlZ10 },
            { id: "357", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.cycleTime },
            { id: "358", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.totalCycles },
            { id: "359", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.injTime },
            { id: "360", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.plasTime },
            { id: "361", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.coolingTime },
            { id: "362", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.holdTime },
            { id: "363", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.demoldTime },
            { id: "364", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.moldOpenTime },
            { id: "365", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.moldCloseTime },
            { id: "366", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.clampForce },
            { id: "367", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.meltCushion },
            { id: "368", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.vpChngOvrPos },
            { id: "369", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.decomStrBfrPlas },
            { id: "370", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.decomStrAftrPlas },
            { id: "371", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.injVelStp1 },
            { id: "372", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.injVelStp2 },
            { id: "373", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.injVelStp3 },
            { id: "374", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.plasVelMax },
            { id: "375", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.plasStrokeMax },
            { id: "376", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.injPressureMax },
            { id: "377", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.holdPressureMax },
            { id: "378", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.specPressureTrnsfr },
            { id: "379", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.specPressureMax },
            { id: "380", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.backPressure },
            { id: "381", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.plasStroke },
            { id: "382", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.plasVelAvg },
            { id: "383", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.plasPressureAvg },
            { id: "384", qc: 3, ts: timestamp, val: imm3?.data?.cycle?.plasPressureMax }
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },
    publishImm3Scrap(imm3: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [

            { id: "385", qc: 3, ts: timestamp, val: imm3?.data?.scrap?.scrapBarcode },
            { id: "308", qc: 3, ts: timestamp, val: imm3?.data?.scrap?.scrapReason },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },

    publishImm4(imm4: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [
            { id: "401", qc: 3, ts: timestamp, val: imm4?.uniqueid },
            { id: "402", qc: 3, ts: timestamp, val: imm4?.date },
            { id: "403", qc: 3, ts: timestamp, val: imm4?.datamatrix },
            { id: "404", qc: 3, ts: timestamp, val: imm4?.data?.part?.mouldID },
            { id: "405", qc: 3, ts: timestamp, val: imm4?.data?.part?.mouldDescription },
            { id: "406", qc: 3, ts: timestamp, val: imm4?.data?.part?.materialNumber },
            { id: "407", qc: 3, ts: timestamp, val: imm4?.data?.part?.materialDescription },
            { id: "408", qc: 3, ts: timestamp, val: imm4?.data?.scrap?.scrapReason },
            { id: "409", qc: 3, ts: timestamp, val: imm4?.data?.energy?.shiftkWh },
            { id: "410", qc: 3, ts: timestamp, val: imm4?.data?.energy?.shiftkWh_pcs },
            { id: "411", qc: 3, ts: timestamp, val: imm4?.data?.energy?.shiftkWh_kg },
            { id: "412", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ01 },
            { id: "413", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ02 },
            { id: "414", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ03 },
            { id: "415", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ04 },
            { id: "416", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ05 },
            { id: "417", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ06 },
            { id: "418", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ07 },
            { id: "419", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ08 },
            { id: "420", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ09 },
            { id: "421", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ10 },
            { id: "422", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ11 },
            { id: "423", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ12 },
            { id: "424", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ13 },
            { id: "425", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ14 },
            { id: "426", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ15 },
            { id: "427", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ16 },
            { id: "428", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ17 },
            { id: "429", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ18 },
            { id: "430", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ19 },
            { id: "431", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ20 },
            { id: "432", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ21 },
            { id: "433", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ22 },
            { id: "434", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ23 },
            { id: "435", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ24 },
            { id: "436", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ25 },
            { id: "437", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ26 },
            { id: "438", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ27 },
            { id: "439", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ28 },
            { id: "440", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ29 },
            { id: "441", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ30 },
            { id: "442", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ31 },
            { id: "443", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ32 },
            { id: "444", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ33 },
            { id: "445", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ34 },
            { id: "446", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ35 },
            { id: "447", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempMldZ36 },
            { id: "448", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempBrlZ01 },
            { id: "449", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempBrlZ02 },
            { id: "450", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempBrlZ03 },
            { id: "451", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempBrlZ04 },
            { id: "452", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempBrlZ05 },
            { id: "453", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempBrlZ06 },
            { id: "454", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempBrlZ07 },
            { id: "455", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempBrlZ09 },
            { id: "456", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.tempBrlZ10 },
            { id: "457", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.cycleTime },
            { id: "458", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.totalCycle },
            { id: "459", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.injTime },
            { id: "460", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.plasTime },
            { id: "461", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.coolingTime },
            { id: "462", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.holdTime },
            { id: "463", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.demoldTime },
            { id: "464", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.moldOpenTime },
            { id: "465", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.moldCloseTime },
            { id: "466", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.clampForce },
            { id: "467", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.meltCushion },
            { id: "468", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.vpChngOvrPos },
            { id: "469", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.decomStrBfrPlas },
            { id: "470", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.decomStrAftrPlas },
            { id: "471", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.injVelStp1 },
            { id: "472", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.injVelStp2 },
            { id: "473", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.injVelStp3 },
            { id: "474", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.plasVelMax },
            { id: "475", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.plasStrokeMax },
            { id: "476", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.injPressureMax },
            { id: "477", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.holdPressureMax },
            { id: "478", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.specPressureTrnsfr },
            { id: "479", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.specPressureMax },
            { id: "480", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.backPressure },
            { id: "481", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.plasStroke },
            { id: "482", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.plasVelAvg },
            { id: "483", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.plasPressureAvg },
            { id: "484", qc: 3, ts: timestamp, val: imm4?.data?.cycle?.plasPressureMax },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },
    publishImm4Scrap(imm4: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [

            { id: "485", qc: 3, ts: timestamp, val: imm4?.data?.scrap?.scrapBarcode },
            { id: "408", qc: 3, ts: timestamp, val: imm4?.data?.scrap?.scrapReason },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },

    publishImm5(imm5: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [
            { id: "501", qc: 3, ts: timestamp, val: imm5?.uniqueid },
            { id: "502", qc: 3, ts: timestamp, val: imm5?.date },
            { id: "503", qc: 3, ts: timestamp, val: imm5?.datamatrix },
            { id: "504", qc: 3, ts: timestamp, val: imm5?.data?.part?.mouldID },
            { id: "505", qc: 3, ts: timestamp, val: imm5?.data?.part?.mouldDescription },
            { id: "506", qc: 3, ts: timestamp, val: imm5?.data?.part?.materialNumber },
            { id: "507", qc: 3, ts: timestamp, val: imm5?.data?.part?.materialDescription },
            { id: "508", qc: 3, ts: timestamp, val: imm5?.data?.scrap?.scrapReason },
            { id: "509", qc: 3, ts: timestamp, val: imm5?.data?.energy?.shiftkWh },
            { id: "510", qc: 3, ts: timestamp, val: imm5?.data?.energy?.shiftkWh_pcs },
            { id: "511", qc: 3, ts: timestamp, val: imm5?.data?.energy?.shiftkWh_kg },
            { id: "512", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ01 },
            { id: "513", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ02 },
            { id: "514", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ03 },
            { id: "515", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ04 },
            { id: "516", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ05 },
            { id: "517", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ06 },
            { id: "518", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ07 },
            { id: "519", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ08 },
            { id: "520", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ09 },
            { id: "521", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ10 },
            { id: "522", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ11 },
            { id: "523", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ12 },
            { id: "524", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ13 },
            { id: "525", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ14 },
            { id: "526", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ15 },
            { id: "527", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ16 },
            { id: "528", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ17 },
            { id: "529", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ18 },
            { id: "530", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ19 },
            { id: "531", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ20 },
            { id: "532", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ21 },
            { id: "533", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ22 },
            { id: "534", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ23 },
            { id: "535", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ24 },
            { id: "536", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ25 },
            { id: "537", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ26 },
            { id: "538", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ27 },
            { id: "539", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ28 },
            { id: "540", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ29 },
            { id: "541", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ30 },
            { id: "542", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ31 },
            { id: "543", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ32 },
            { id: "544", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ33 },
            { id: "545", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ34 },
            { id: "546", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ35 },
            { id: "547", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempMldZ36 },
            { id: "548", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempBrlZ01 },
            { id: "549", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempBrlZ02 },
            { id: "550", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempBrlZ03 },
            { id: "551", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempBrlZ04 },
            { id: "552", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempBrlZ05 },
            { id: "553", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempBrlZ06 },
            { id: "554", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempBrlZ07 },
            { id: "555", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempBrlZ10 },
            { id: "556", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.tempBrlZ11 },
            { id: "557", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.cycleTime },
            { id: "558", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.totalCycles },
            { id: "559", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.injTime },
            { id: "560", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.plasTime },
            { id: "561", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.coolingTime },
            { id: "562", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.holdTime },
            { id: "563", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.demoldTime },
            { id: "564", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.moldOpenTime },
            { id: "565", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.moldCloseTime },
            { id: "566", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.clampForce },
            { id: "567", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.meltCushion },
            { id: "568", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.vpChngOvrPos },
            { id: "569", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.decomStrBfrPlas },
            { id: "570", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.decomStrAftrPlas },
            { id: "571", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.injVelStp1 },
            { id: "572", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.injVelStp2 },
            { id: "573", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.injVelStp3 },
            { id: "574", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.plasVelMax },
            { id: "575", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.plasStrokeMax },
            { id: "576", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.injPressureMax },
            { id: "577", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.holdPressureMax },
            { id: "578", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.specPressureTrnsfr },
            { id: "579", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.specPressureMax },
            { id: "580", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.backPressure },
            { id: "581", qc: 3, ts: timestamp, val: imm5?.data?.cycle?.plasVelMax2 },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },
    publishImm5Scrap(imm5: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [

            { id: "582", qc: 3, ts: timestamp, val: imm5?.data?.scrap?.scrapBarcode },
            { id: "508", qc: 3, ts: timestamp, val: imm5?.data?.scrap?.scrapReason },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },
    
    publishImm6(imm6: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [
            { id: "601", qc: 3, ts: timestamp, val: imm6?.uniqueid },
            { id: "602", qc: 3, ts: timestamp, val: imm6?.date },
            { id: "603", qc: 3, ts: timestamp, val: imm6?.datamatrix },
            { id: "604", qc: 3, ts: timestamp, val: imm6?.data?.part?.mouldID },
            { id: "605", qc: 3, ts: timestamp, val: imm6?.data?.part?.mouldDescription },
            { id: "606", qc: 3, ts: timestamp, val: imm6?.data?.part?.materialNumber },
            { id: "607", qc: 3, ts: timestamp, val: imm6?.data?.part?.materialDescription },
            { id: "608", qc: 3, ts: timestamp, val: imm6?.data?.scrap?.scrapReason },
            { id: "609", qc: 3, ts: timestamp, val: imm6?.data?.energy?.shiftkWh },
            { id: "610", qc: 3, ts: timestamp, val: imm6?.data?.energy?.shiftkWh_pcs },
            { id: "611", qc: 3, ts: timestamp, val: imm6?.data?.energy?.shiftkWh_kg },
            { id: "612", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ01 },
            { id: "613", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ02 },
            { id: "614", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ03 },
            { id: "615", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ04 },
            { id: "616", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ05 },
            { id: "617", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ06 },
            { id: "618", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ07 },
            { id: "619", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ08 },
            { id: "620", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ09 },
            { id: "621", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ10 },
            { id: "622", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ11 },
            { id: "623", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ12 },
            { id: "624", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ13 },
            { id: "625", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ14 },
            { id: "626", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ15 },
            { id: "627", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ16 },
            { id: "628", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ17 },
            { id: "629", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ18 },
            { id: "630", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ19 },
            { id: "631", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ20 },
            { id: "632", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ21 },
            { id: "633", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ22 },
            { id: "634", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ23 },
            { id: "635", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempMldZ24 },
            { id: "636", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempBrlZ01 },
            { id: "637", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempBrlZ02 },
            { id: "638", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempBrlZ03 },
            { id: "639", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempBrlZ04 },
            { id: "640", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempBrlZ05 },
            { id: "641", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempBrlZ06 },
            { id: "642", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempBrlZ07 },
            { id: "643", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempBrlZ08 },
            { id: "644", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.tempFlngZ },
            { id: "645", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.cycleTime },
            { id: "646", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.totalCycles },
            { id: "647", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.injTime },
            { id: "648", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.plasTime },
            { id: "649", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.meltCushion },
            { id: "650", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.vpChngOvrPos },
            { id: "651", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.decomStrBfrPlas },
            { id: "652", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.decomStrAftrPlas },
            { id: "653", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.plasStroke },
            { id: "654", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.plasStrokeMax },
            { id: "655", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.plasVelMax },
            { id: "656", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.injVelAvg },
            { id: "657", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.injVelMax },
            { id: "658", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.holdPressureMax },
            { id: "659", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.plasPressureSpecMax },
            { id: "660", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.specPressureTrnsfr },
            { id: "661", qc: 3, ts: timestamp, val: imm6?.data?.cycle?.specPressureMax },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },
    publishImm6Scrap(imm6: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [

            { id: "662", qc: 3, ts: timestamp, val: imm6?.data?.scrap?.scrapBarcode },
            { id: "608", qc: 3, ts: timestamp, val: imm6?.data?.scrap?.scrapReason },
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
            { id: "701", qc: 3, ts: timestamp, val: imm7?.uniqueid },
            { id: "702", qc: 3, ts: timestamp, val: imm7?.date },
            { id: "703", qc: 3, ts: timestamp, val: imm7?.datamatrix },
            { id: "704", qc: 3, ts: timestamp, val: imm7?.data?.part?.mouldID },
            { id: "705", qc: 3, ts: timestamp, val: imm7?.data?.part?.mouldDescription },
            { id: "706", qc: 3, ts: timestamp, val: imm7?.data?.part?.materialNumber },
            { id: "707", qc: 3, ts: timestamp, val: imm7?.data?.part?.materialDescription },
            { id: "708", qc: 3, ts: timestamp, val: imm7?.data?.scrap?.scrapReason },
            { id: "709", qc: 3, ts: timestamp, val: imm7?.data?.energy?.shiftkWh },
            { id: "710", qc: 3, ts: timestamp, val: imm7?.data?.energy?.shiftkWh_pcs },
            { id: "711", qc: 3, ts: timestamp, val: imm7?.data?.energy?.shiftkWh_kg },
            { id: "712", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ01 },
            { id: "713", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ02 },
            { id: "714", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ03 },
            { id: "715", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ04 },
            { id: "716", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ05 },
            { id: "717", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ06 },
            { id: "718", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ07 },
            { id: "719", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ08 },
            { id: "720", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ09 },
            { id: "721", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ10 },
            { id: "722", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ11 },
            { id: "723", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ12 },
            { id: "724", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ13 },
            { id: "725", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ14 },
            { id: "726", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ15 },
            { id: "727", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ16 },
            { id: "728", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ17 },
            { id: "729", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ18 },
            { id: "730", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ19 },
            { id: "731", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ20 },
            { id: "732", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ21 },
            { id: "733", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ22 },
            { id: "734", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ23 },
            { id: "735", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempMldZ24 },
            { id: "736", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempBrlZ01 },
            { id: "737", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempBrlZ02 },
            { id: "738", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempBrlZ03 },
            { id: "739", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempBrlZ04 },
            { id: "740", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempBrlZ05 },
            { id: "741", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempBrlZ06 },
            { id: "742", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempBrlZ07 },
            { id: "743", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempBrlZ08 },
            { id: "744", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.tempFlngZ },
            { id: "745", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.cycleTime },
            { id: "746", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.totalCycles },
            { id: "747", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.injTime },
            { id: "748", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.plasTime },
            { id: "749", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.meltCushion },
            { id: "750", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.vpChngOvrPos },
            { id: "751", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.decomStrBfrPlas },
            { id: "752", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.decomStrAftrPlas },
            { id: "753", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.plasStroke },
            { id: "754", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.plasStrokeMax },
            { id: "755", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.plasVelMax },
            { id: "756", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.injVelAvg },
            { id: "757", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.injVelMax },
            { id: "758", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.holdPressureMax },
            { id: "759", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.plasPressureSpecMax },
            { id: "760", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.specPressureTrnsfr },
            { id: "761", qc: 3, ts: timestamp, val: imm7?.data?.data?.cycle?.specPressureMax },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },
    publishImm7Scrap(imm7: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [

            { id: "762", qc: 3, ts: timestamp, val: imm7?.data?.scrap?.scrapBarcode },
            { id: "708", qc: 3, ts: timestamp, val: imm7?.data?.scrap?.scrapReason },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },

    publishImm8(imm8: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [
            { id: "801", qc: 3, ts: timestamp, val: imm8?.uniqueid },
            { id: "802", qc: 3, ts: timestamp, val: imm8?.date },
            { id: "803", qc: 3, ts: timestamp, val: imm8?.datamatrix },
            { id: "804", qc: 3, ts: timestamp, val: imm8?.data?.part?.mouldID },
            { id: "805", qc: 3, ts: timestamp, val: imm8?.data?.part?.mouldDescription },
            { id: "806", qc: 3, ts: timestamp, val: imm8?.data?.part?.materialNumber },
            { id: "807", qc: 3, ts: timestamp, val: imm8?.data?.part?.materialDescription },
            { id: "808", qc: 3, ts: timestamp, val: imm8?.data?.scrap?.scrapReason },
            { id: "809", qc: 3, ts: timestamp, val: imm8?.data?.energy?.shiftkWh },
            { id: "810", qc: 3, ts: timestamp, val: imm8?.data?.energy?.shiftkWh_pcs },
            { id: "811", qc: 3, ts: timestamp, val: imm8?.data?.energy?.shiftkWh_kg },
            { id: "812", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ01 },
            { id: "813", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ02 },
            { id: "814", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ03 },
            { id: "815", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ04 },
            { id: "816", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ05 },
            { id: "817", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ06 },
            { id: "818", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ07 },
            { id: "819", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ08 },
            { id: "820", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ09 },
            { id: "821", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ10 },
            { id: "822", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ11 },
            { id: "823", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ12 },
            { id: "824", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ13 },
            { id: "825", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ14 },
            { id: "826", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ15 },
            { id: "827", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ16 },
            { id: "828", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ17 },
            { id: "829", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ18 },
            { id: "830", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ19 },
            { id: "831", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ20 },
            { id: "832", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ21 },
            { id: "833", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ22 },
            { id: "834", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ23 },
            { id: "835", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempMldZ24 },
            { id: "836", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempBrlZ01 },
            { id: "837", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempBrlZ02 },
            { id: "838", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempBrlZ03 },
            { id: "839", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempBrlZ04 },
            { id: "840", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempBrlZ05 },
            { id: "841", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempBrlZ06 },
            { id: "842", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempBrlZ07 },
            { id: "843", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempBrlZ08 },
            { id: "844", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempBrlZ09 },
            { id: "845", qc: 3, ts: timestamp, val: imm8?.data?.cycle.tempFlngZ },
            { id: "846", qc: 3, ts: timestamp, val: imm8?.data?.cycle.cycleTime },
            { id: "847", qc: 3, ts: timestamp, val: imm8?.data?.cycle.totalCycles },
            { id: "848", qc: 3, ts: timestamp, val: imm8?.data?.cycle.injTime },
            { id: "849", qc: 3, ts: timestamp, val: imm8?.data?.cycle.plasTime },
            { id: "850", qc: 3, ts: timestamp, val: imm8?.data?.cycle.holdTime },
            { id: "851", qc: 3, ts: timestamp, val: imm8?.data?.cycle.demoldTime },
            { id: "852", qc: 3, ts: timestamp, val: imm8?.data?.cycle.clampForce },
            { id: "853", qc: 3, ts: timestamp, val: imm8?.data?.cycle.meltCushion },
            { id: "854", qc: 3, ts: timestamp, val: imm8?.data?.cycle.vpChngOvrPos },
            { id: "855", qc: 3, ts: timestamp, val: imm8?.data?.cycle.decomStrBfrPlas },
            { id: "856", qc: 3, ts: timestamp, val: imm8?.data?.cycle.decomStrAftrPlas },
            { id: "857", qc: 3, ts: timestamp, val: imm8?.data?.cycle.plasStroke },
            { id: "858", qc: 3, ts: timestamp, val: imm8?.data?.cycle.plasStrokeMax },
            { id: "859", qc: 3, ts: timestamp, val: imm8?.data?.cycle.plasVelAvg },
            { id: "860", qc: 3, ts: timestamp, val: imm8?.data?.cycle.plasVelMax },
            { id: "861", qc: 3, ts: timestamp, val: imm8?.data?.cycle.injVelAvg },
            { id: "862", qc: 3, ts: timestamp, val: imm8?.data?.cycle.injVelMax },
            { id: "863", qc: 3, ts: timestamp, val: imm8?.data?.cycle.injPressureAvg },
            { id: "864", qc: 3, ts: timestamp, val: imm8?.data?.cycle.injPressureMax },
            { id: "865", qc: 3, ts: timestamp, val: imm8?.data?.cycle.holdPressureMax },
            { id: "866", qc: 3, ts: timestamp, val: imm8?.data?.cycle.plasPressureSpecAvg },
            { id: "867", qc: 3, ts: timestamp, val: imm8?.data?.cycle.plasPressureSpecMax },
            { id: "868", qc: 3, ts: timestamp, val: imm8?.data?.cycle.specPressureTrnsfr },
            { id: "869", qc: 3, ts: timestamp, val: imm8?.data?.cycle.specPressureMax },
            { id: "870", qc: 3, ts: timestamp, val: imm8?.data?.cycle.backPressure },
            { id: "871", qc: 3, ts: timestamp, val: imm8?.data?.cycle.energyTotalCycle },
            { id: "872", qc: 3, ts: timestamp, val: imm8?.data?.cycle.energyMainDrive },
            { id: "873", qc: 3, ts: timestamp, val: imm8?.data?.cycle.energyMoldHeating },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },
    publishImm8Scrap(imm8: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [

            { id: "874", qc: 3, ts: timestamp, val: imm8?.data?.scrap?.scrapBarcode },
            { id: "808", qc: 3, ts: timestamp, val: imm8?.data?.scrap?.scrapReason },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },

    publishImm9(imm9: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [
            { id: "901", qc: 3, ts: timestamp, val: imm9?.uniqueid },
            { id: "902", qc: 3, ts: timestamp, val: imm9?.date },
            { id: "903", qc: 3, ts: timestamp, val: imm9?.datamatrix },
            { id: "904", qc: 3, ts: timestamp, val: imm9?.data?.part?.mouldID },
            { id: "905", qc: 3, ts: timestamp, val: imm9?.data?.part?.mouldDescription },
            { id: "906", qc: 3, ts: timestamp, val: imm9?.data?.part?.materialNumber },
            { id: "907", qc: 3, ts: timestamp, val: imm9?.data?.part?.materialDescription },
            { id: "908", qc: 3, ts: timestamp, val: imm9?.data?.part?.weight },
            { id: "909", qc: 3, ts: timestamp, val: imm9?.data?.scrap?.scrapReason },
            { id: "910", qc: 3, ts: timestamp, val: imm9?.data?.energy?.shiftkWh },
            { id: "911", qc: 3, ts: timestamp, val: imm9?.data?.energy?.shiftkWhPcs },
            { id: "912", qc: 3, ts: timestamp, val: imm9?.data?.energy?.shiftkWhKg },
            { id: "913", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ01 },
            { id: "914", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ02 },
            { id: "915", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ03 },
            { id: "916", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ04 },
            { id: "917", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ05 },
            { id: "918", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ06 },
            { id: "919", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ07 },
            { id: "920", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ08 },
            { id: "921", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ09 },
            { id: "922", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ10 },
            { id: "923", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ11 },
            { id: "924", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ12 },
            { id: "925", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ13 },
            { id: "926", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ14 },
            { id: "927", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ15 },
            { id: "928", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ16 },
            { id: "929", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ17 },
            { id: "930", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ18 },
            { id: "931", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ19 },
            { id: "932", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ20 },
            { id: "933", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ21 },
            { id: "934", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ22 },
            { id: "935", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ23 },
            { id: "936", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempMldZ24 },
            { id: "937", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempBrlZ01 },
            { id: "938", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempBrlZ02 },
            { id: "939", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempBrlZ03 },
            { id: "940", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempBrlZ04 },
            { id: "941", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempBrlZ05 },
            { id: "942", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempBrlZ06 },
            { id: "943", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempBrlZ07 },
            { id: "944", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempBrlZ08 },
            { id: "945", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempBrlZ09 },
            { id: "946", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.tempFlngZ },
            { id: "947", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.cycleTime },
            { id: "948", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.totalCycles },
            { id: "949", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.injTime },
            { id: "950", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.plasTime },
            { id: "951", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.holdTime },
            { id: "952", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.demoldTime },
            { id: "953", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.clampForce },
            { id: "954", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.meltCushion },
            { id: "955", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.vpChngOvrPos },
            { id: "956", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.decomStrBfrPlas },
            { id: "957", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.decomStrAftrPlas },
            { id: "958", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.plasStroke },
            { id: "959", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.plasStrokeMax },
            { id: "960", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.plasVelAvg },
            { id: "961", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.plasVelMax },
            { id: "962", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.injVelAvg },
            { id: "963", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.injVelMax },
            { id: "964", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.injPressureAvg },
            { id: "965", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.injPressureMax },
            { id: "966", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.holdPressureMax },
            { id: "967", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.plasPressureSpecAvg },
            { id: "968", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.plasPressureSpecMax },
            { id: "969", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.specPressureTrnsfr },
            { id: "970", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.specPressureMax },
            { id: "971", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.backPressure },
            { id: "972", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.energyTotalCycle },
            { id: "973", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.energyMainDrive },
            { id: "974", qc: 3, ts: timestamp, val: imm9?.data?.cycle?.energyMoldHeating },
            { id: "975", qc: 3, ts: timestamp, val: imm9?.data?.secondary?.qualityCheckBarcode },
            { id: "976", qc: 3, ts: timestamp, val: imm9?.data?.secondary?.qualityCheckReason },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },
    publishImm9Scrap(imm9: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [

            { id: "977", qc: 3, ts: timestamp, val: imm9?.data?.scrap?.scrapBarcode },
            { id: "909", qc: 3, ts: timestamp, val: imm9?.data?.scrap?.scrapReason },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },

    publishImm10(imm10: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [
            { id: "1001", qc: 3, ts: timestamp, val: imm10?.uniqueid },
            { id: "1002", qc: 3, ts: timestamp, val: imm10?.date },
            { id: "1003", qc: 3, ts: timestamp, val: imm10?.datamatrix },
            { id: "1004", qc: 3, ts: timestamp, val: imm10?.data?.part?.mouldID },
            { id: "1005", qc: 3, ts: timestamp, val: imm10?.data?.part?.mouldDescription },
            { id: "1006", qc: 3, ts: timestamp, val: imm10?.data?.part?.materialNumber },
            { id: "1007", qc: 3, ts: timestamp, val: imm10?.data?.part?.materialDescription },
            { id: "1008", qc: 3, ts: timestamp, val: imm10?.data?.part?.weight },
            { id: "1009", qc: 3, ts: timestamp, val: imm10?.data?.scrap?.scrapReason },
            { id: "1010", qc: 3, ts: timestamp, val: imm10?.data?.energy?.shiftkWh },
            { id: "1011", qc: 3, ts: timestamp, val: imm10?.data?.energy?.shiftkWhPcs },
            { id: "1012", qc: 3, ts: timestamp, val: imm10?.data?.energy?.shiftkWhKg },
            { id: "1013", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ01 },
            { id: "1014", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ02 },
            { id: "1015", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ03 },
            { id: "1016", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ04 },
            { id: "1017", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ05 },
            { id: "1018", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ06 },
            { id: "1019", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ07 },
            { id: "1020", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ08 },
            { id: "1021", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ09 },
            { id: "1022", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ10 },
            { id: "1023", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ11 },
            { id: "1024", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ12 },
            { id: "1025", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ13 },
            { id: "1026", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ14 },
            { id: "1027", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ15 },
            { id: "1028", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ16 },
            { id: "1029", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ17 },
            { id: "1030", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ18 },
            { id: "1031", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ19 },
            { id: "1032", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ20 },
            { id: "1033", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ21 },
            { id: "1034", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ22 },
            { id: "1035", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ23 },
            { id: "1036", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempMldZ24 },
            { id: "1037", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempBrlZ01 },
            { id: "1038", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempBrlZ02 },
            { id: "1039", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempBrlZ03 },
            { id: "1040", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempBrlZ04 },
            { id: "1041", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempBrlZ05 },
            { id: "1042", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempBrlZ06 },
            { id: "1043", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempBrlZ07 },
            { id: "1044", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempBrlZ08 },
            { id: "1045", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempBrlZ09 },
            { id: "1046", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.tempFlngZ },
            { id: "1047", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.cycleTime },
            { id: "1048", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.totalCycles },
            { id: "1049", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.injTime },
            { id: "1050", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.plasTime },
            { id: "1051", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.holdTime },
            { id: "1052", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.demoldTime },
            { id: "1053", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.clampForce },
            { id: "1054", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.meltCushion },
            { id: "1055", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.vpChngOvrPos },
            { id: "1056", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.decomStrBfrPlas },
            { id: "1057", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.decomStrAftrPlas },
            { id: "1058", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.plasStroke },
            { id: "1059", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.plasStrokeMax },
            { id: "1060", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.plasVelAvg },
            { id: "1061", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.plasVelMax },
            { id: "1062", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.injVelAvg },
            { id: "1063", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.injVelMax },
            { id: "1064", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.injPressureAvg },
            { id: "1065", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.injPressureMax },
            { id: "1066", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.holdPressureMax },
            { id: "1067", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.plasPressureSpecAvg },
            { id: "1068", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.plasPressureSpecMax },
            { id: "1069", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.specPressureTrnsfr },
            { id: "1070", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.specPressureMax },
            { id: "1071", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.backPressure },
            { id: "1072", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.energyTotalCycle },
            { id: "1073", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.energyMainDrive },
            { id: "1074", qc: 3, ts: timestamp, val: imm10?.data?.cycle?.energyMoldHeating },
            { id: "1075", qc: 3, ts: timestamp, val: imm10?.data?.secondary?.qualityCheckBarcode },
            { id: "1076", qc: 3, ts: timestamp, val: imm10?.data?.secondary?.qualityCheckReason },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },
    publishImm10Scrap(imm10: IIMM) {
        const message: IMessage = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString()
        message.vals = [

            { id: "1077", qc: 3, ts: timestamp, val: imm10?.data?.scrap?.scrapBarcode },
            { id: "1009", qc: 3, ts: timestamp, val: imm10?.data?.scrap?.scrapReason },
        ]
        mqttClient.publish(config.opcuaserver.subscribe, message)
    },
}

export default opcuaserver