"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utility/logger"));
const mqtt_1 = __importDefault(require("../utility/mqtt"));
const config_1 = require("../config/config");
const opcuaservermeta_1 = require("../dataset/opcuaservermeta");
let mqttClient;
const opcuaserver = {
    initopcuaserver() {
        logger_1.default.info("OPC UA Server is initialized.");
        try {
            mqttClient = new mqtt_1.default(config_1.config.opcuaserver.url, config_1.config.opcuaserver.username, config_1.config.opcuaserver.password);
            logger_1.default.info("Trying to connect databus");
            mqttClient.client.on('connect', () => {
                logger_1.default.info("MQTT Client is connected to databus");
                // Send OPC UA Server Meta Data
                setTimeout(() => {
                    mqttClient.meta(config_1.config.opcuaserver.meta, opcuaservermeta_1.opcuaservermetadata);
                }, 1000);
            });
        }
        catch (error) {
            logger_1.default.error(error);
        }
    },
    publishImm7(imm7) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91;
        const message = {
            seq: 1,
            vals: []
        };
        const timestamp = (new Date()).toString();
        message.vals = [
            { id: "701", qc: 2, ts: timestamp, val: imm7 === null || imm7 === void 0 ? void 0 : imm7.uniqueid },
            { id: "702", qc: 2, ts: timestamp, val: imm7 === null || imm7 === void 0 ? void 0 : imm7.date },
            { id: "703", qc: 2, ts: timestamp, val: imm7 === null || imm7 === void 0 ? void 0 : imm7.datamatrix },
            { id: "704", qc: 2, ts: timestamp, val: (_b = (_a = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _a === void 0 ? void 0 : _a.part) === null || _b === void 0 ? void 0 : _b.mouldID },
            { id: "705", qc: 2, ts: timestamp, val: (_d = (_c = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _c === void 0 ? void 0 : _c.part) === null || _d === void 0 ? void 0 : _d.mouldDescription },
            { id: "706", qc: 2, ts: timestamp, val: (_f = (_e = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _e === void 0 ? void 0 : _e.part) === null || _f === void 0 ? void 0 : _f.materialNumber },
            { id: "707", qc: 2, ts: timestamp, val: (_h = (_g = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _g === void 0 ? void 0 : _g.part) === null || _h === void 0 ? void 0 : _h.materialDescription },
            { id: "708", qc: 2, ts: timestamp, val: (_k = (_j = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _j === void 0 ? void 0 : _j.scrap) === null || _k === void 0 ? void 0 : _k.scrapReason },
            { id: "709", qc: 2, ts: timestamp, val: (_m = (_l = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _l === void 0 ? void 0 : _l.energy) === null || _m === void 0 ? void 0 : _m.shiftkWh },
            { id: "710", qc: 2, ts: timestamp, val: (_p = (_o = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _o === void 0 ? void 0 : _o.energy) === null || _p === void 0 ? void 0 : _p.shiftkWh_pcs },
            { id: "711", qc: 2, ts: timestamp, val: (_r = (_q = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _q === void 0 ? void 0 : _q.energy) === null || _r === void 0 ? void 0 : _r.shiftkWh_kg },
            { id: "712", qc: 2, ts: timestamp, val: (_t = (_s = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _s === void 0 ? void 0 : _s.cycle) === null || _t === void 0 ? void 0 : _t.tempMldZ01 },
            { id: "713", qc: 2, ts: timestamp, val: (_v = (_u = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _u === void 0 ? void 0 : _u.cycle) === null || _v === void 0 ? void 0 : _v.tempMldZ02 },
            { id: "714", qc: 2, ts: timestamp, val: (_x = (_w = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _w === void 0 ? void 0 : _w.cycle) === null || _x === void 0 ? void 0 : _x.tempMldZ03 },
            { id: "715", qc: 2, ts: timestamp, val: (_z = (_y = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _y === void 0 ? void 0 : _y.cycle) === null || _z === void 0 ? void 0 : _z.tempMldZ04 },
            { id: "716", qc: 2, ts: timestamp, val: (_1 = (_0 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _0 === void 0 ? void 0 : _0.cycle) === null || _1 === void 0 ? void 0 : _1.tempMldZ05 },
            { id: "717", qc: 2, ts: timestamp, val: (_3 = (_2 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _2 === void 0 ? void 0 : _2.cycle) === null || _3 === void 0 ? void 0 : _3.tempMldZ06 },
            { id: "718", qc: 2, ts: timestamp, val: (_5 = (_4 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _4 === void 0 ? void 0 : _4.cycle) === null || _5 === void 0 ? void 0 : _5.tempMldZ07 },
            { id: "719", qc: 2, ts: timestamp, val: (_7 = (_6 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _6 === void 0 ? void 0 : _6.cycle) === null || _7 === void 0 ? void 0 : _7.tempMldZ08 },
            { id: "720", qc: 2, ts: timestamp, val: (_9 = (_8 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _8 === void 0 ? void 0 : _8.cycle) === null || _9 === void 0 ? void 0 : _9.tempMldZ09 },
            { id: "721", qc: 2, ts: timestamp, val: (_11 = (_10 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _10 === void 0 ? void 0 : _10.cycle) === null || _11 === void 0 ? void 0 : _11.tempMldZ10 },
            { id: "722", qc: 2, ts: timestamp, val: (_13 = (_12 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _12 === void 0 ? void 0 : _12.cycle) === null || _13 === void 0 ? void 0 : _13.tempMldZ11 },
            { id: "723", qc: 2, ts: timestamp, val: (_15 = (_14 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _14 === void 0 ? void 0 : _14.cycle) === null || _15 === void 0 ? void 0 : _15.tempMldZ12 },
            { id: "724", qc: 2, ts: timestamp, val: (_17 = (_16 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _16 === void 0 ? void 0 : _16.cycle) === null || _17 === void 0 ? void 0 : _17.tempMldZ13 },
            { id: "725", qc: 2, ts: timestamp, val: (_19 = (_18 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _18 === void 0 ? void 0 : _18.cycle) === null || _19 === void 0 ? void 0 : _19.tempMldZ14 },
            { id: "726", qc: 2, ts: timestamp, val: (_21 = (_20 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _20 === void 0 ? void 0 : _20.cycle) === null || _21 === void 0 ? void 0 : _21.tempMldZ15 },
            { id: "727", qc: 2, ts: timestamp, val: (_23 = (_22 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _22 === void 0 ? void 0 : _22.cycle) === null || _23 === void 0 ? void 0 : _23.tempMldZ16 },
            { id: "728", qc: 2, ts: timestamp, val: (_25 = (_24 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _24 === void 0 ? void 0 : _24.cycle) === null || _25 === void 0 ? void 0 : _25.tempMldZ17 },
            { id: "729", qc: 2, ts: timestamp, val: (_27 = (_26 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _26 === void 0 ? void 0 : _26.cycle) === null || _27 === void 0 ? void 0 : _27.tempMldZ18 },
            { id: "730", qc: 2, ts: timestamp, val: (_29 = (_28 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _28 === void 0 ? void 0 : _28.cycle) === null || _29 === void 0 ? void 0 : _29.tempMldZ19 },
            { id: "731", qc: 2, ts: timestamp, val: (_31 = (_30 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _30 === void 0 ? void 0 : _30.cycle) === null || _31 === void 0 ? void 0 : _31.tempMldZ20 },
            { id: "732", qc: 2, ts: timestamp, val: (_33 = (_32 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _32 === void 0 ? void 0 : _32.cycle) === null || _33 === void 0 ? void 0 : _33.tempMldZ21 },
            { id: "733", qc: 2, ts: timestamp, val: (_35 = (_34 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _34 === void 0 ? void 0 : _34.cycle) === null || _35 === void 0 ? void 0 : _35.tempMldZ22 },
            { id: "734", qc: 2, ts: timestamp, val: (_37 = (_36 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _36 === void 0 ? void 0 : _36.cycle) === null || _37 === void 0 ? void 0 : _37.tempMldZ23 },
            { id: "735", qc: 2, ts: timestamp, val: (_39 = (_38 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _38 === void 0 ? void 0 : _38.cycle) === null || _39 === void 0 ? void 0 : _39.tempMldZ24 },
            { id: "736", qc: 2, ts: timestamp, val: (_41 = (_40 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _40 === void 0 ? void 0 : _40.cycle) === null || _41 === void 0 ? void 0 : _41.tempBrlZ01 },
            { id: "737", qc: 2, ts: timestamp, val: (_43 = (_42 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _42 === void 0 ? void 0 : _42.cycle) === null || _43 === void 0 ? void 0 : _43.tempBrlZ02 },
            { id: "738", qc: 2, ts: timestamp, val: (_45 = (_44 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _44 === void 0 ? void 0 : _44.cycle) === null || _45 === void 0 ? void 0 : _45.tempBrlZ03 },
            { id: "739", qc: 2, ts: timestamp, val: (_47 = (_46 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _46 === void 0 ? void 0 : _46.cycle) === null || _47 === void 0 ? void 0 : _47.tempBrlZ04 },
            { id: "740", qc: 2, ts: timestamp, val: (_49 = (_48 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _48 === void 0 ? void 0 : _48.cycle) === null || _49 === void 0 ? void 0 : _49.tempBrlZ05 },
            { id: "741", qc: 2, ts: timestamp, val: (_51 = (_50 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _50 === void 0 ? void 0 : _50.cycle) === null || _51 === void 0 ? void 0 : _51.tempBrlZ06 },
            { id: "742", qc: 2, ts: timestamp, val: (_53 = (_52 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _52 === void 0 ? void 0 : _52.cycle) === null || _53 === void 0 ? void 0 : _53.tempBrlZ07 },
            { id: "743", qc: 2, ts: timestamp, val: (_55 = (_54 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _54 === void 0 ? void 0 : _54.cycle) === null || _55 === void 0 ? void 0 : _55.tempBrlZ08 },
            { id: "744", qc: 2, ts: timestamp, val: (_57 = (_56 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _56 === void 0 ? void 0 : _56.cycle) === null || _57 === void 0 ? void 0 : _57.tempFlngZ },
            { id: "745", qc: 2, ts: timestamp, val: (_59 = (_58 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _58 === void 0 ? void 0 : _58.cycle) === null || _59 === void 0 ? void 0 : _59.cycleTime },
            { id: "746", qc: 2, ts: timestamp, val: (_61 = (_60 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _60 === void 0 ? void 0 : _60.cycle) === null || _61 === void 0 ? void 0 : _61.totalCycles },
            { id: "747", qc: 2, ts: timestamp, val: (_63 = (_62 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _62 === void 0 ? void 0 : _62.cycle) === null || _63 === void 0 ? void 0 : _63.injTime },
            { id: "748", qc: 2, ts: timestamp, val: (_65 = (_64 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _64 === void 0 ? void 0 : _64.cycle) === null || _65 === void 0 ? void 0 : _65.plasTime },
            { id: "749", qc: 2, ts: timestamp, val: (_67 = (_66 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _66 === void 0 ? void 0 : _66.cycle) === null || _67 === void 0 ? void 0 : _67.meltCushion },
            { id: "750", qc: 2, ts: timestamp, val: (_69 = (_68 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _68 === void 0 ? void 0 : _68.cycle) === null || _69 === void 0 ? void 0 : _69.vpChngOvrPos },
            { id: "751", qc: 2, ts: timestamp, val: (_71 = (_70 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _70 === void 0 ? void 0 : _70.cycle) === null || _71 === void 0 ? void 0 : _71.decomStrBfrPlas },
            { id: "752", qc: 2, ts: timestamp, val: (_73 = (_72 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _72 === void 0 ? void 0 : _72.cycle) === null || _73 === void 0 ? void 0 : _73.decomStrAftrPlas },
            { id: "753", qc: 2, ts: timestamp, val: (_75 = (_74 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _74 === void 0 ? void 0 : _74.cycle) === null || _75 === void 0 ? void 0 : _75.plasStroke },
            { id: "754", qc: 2, ts: timestamp, val: (_77 = (_76 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _76 === void 0 ? void 0 : _76.cycle) === null || _77 === void 0 ? void 0 : _77.plasStrokeMax },
            { id: "755", qc: 2, ts: timestamp, val: (_79 = (_78 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _78 === void 0 ? void 0 : _78.cycle) === null || _79 === void 0 ? void 0 : _79.plasVelMax },
            { id: "756", qc: 2, ts: timestamp, val: (_81 = (_80 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _80 === void 0 ? void 0 : _80.cycle) === null || _81 === void 0 ? void 0 : _81.injVelAvg },
            { id: "757", qc: 2, ts: timestamp, val: (_83 = (_82 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _82 === void 0 ? void 0 : _82.cycle) === null || _83 === void 0 ? void 0 : _83.injVelMax },
            { id: "758", qc: 2, ts: timestamp, val: (_85 = (_84 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _84 === void 0 ? void 0 : _84.cycle) === null || _85 === void 0 ? void 0 : _85.holdPressureMax },
            { id: "759", qc: 2, ts: timestamp, val: (_87 = (_86 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _86 === void 0 ? void 0 : _86.cycle) === null || _87 === void 0 ? void 0 : _87.plasPressureSpecMax },
            { id: "760", qc: 2, ts: timestamp, val: (_89 = (_88 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _88 === void 0 ? void 0 : _88.cycle) === null || _89 === void 0 ? void 0 : _89.specPressureTrnsfr },
            { id: "761", qc: 2, ts: timestamp, val: (_91 = (_90 = imm7 === null || imm7 === void 0 ? void 0 : imm7.data) === null || _90 === void 0 ? void 0 : _90.cycle) === null || _91 === void 0 ? void 0 : _91.specPressureMax },
        ];
        mqttClient.publish(config_1.config.opcuaserver.subscribe, message);
    }
};
exports.default = opcuaserver;
