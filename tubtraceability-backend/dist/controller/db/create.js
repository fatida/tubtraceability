"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crateProcessRecord = void 0;
const process_1 = __importDefault(require("../../model/process"));
const logger_1 = __importDefault(require("../../utility/logger"));
function crateProcessRecord(imm) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    const data = {
        uniqueid: (imm === null || imm === void 0 ? void 0 : imm.uniqueid) || 0,
        imm: (imm === null || imm === void 0 ? void 0 : imm.imm) || '',
        date: (imm === null || imm === void 0 ? void 0 : imm.date) || '',
        datamatrix: (imm === null || imm === void 0 ? void 0 : imm.datamatrix) || '',
        mouldid: ((_b = (_a = imm === null || imm === void 0 ? void 0 : imm.data) === null || _a === void 0 ? void 0 : _a.part) === null || _b === void 0 ? void 0 : _b.mouldID) || '',
        moulddescription: ((_d = (_c = imm === null || imm === void 0 ? void 0 : imm.data) === null || _c === void 0 ? void 0 : _c.part) === null || _d === void 0 ? void 0 : _d.mouldDescription) || '',
        materialnumber: ((_f = (_e = imm === null || imm === void 0 ? void 0 : imm.data) === null || _e === void 0 ? void 0 : _e.part) === null || _f === void 0 ? void 0 : _f.materialNumber) || '',
        materialdescription: ((_h = (_g = imm === null || imm === void 0 ? void 0 : imm.data) === null || _g === void 0 ? void 0 : _g.part) === null || _h === void 0 ? void 0 : _h.materialDescription) || '',
        barcode: ((_k = (_j = imm === null || imm === void 0 ? void 0 : imm.data) === null || _j === void 0 ? void 0 : _j.part) === null || _k === void 0 ? void 0 : _k.barcode) || '',
        weight: ((_m = (_l = imm === null || imm === void 0 ? void 0 : imm.data) === null || _l === void 0 ? void 0 : _l.part) === null || _m === void 0 ? void 0 : _m.weight) || 0,
        scrap_barcode: ((_p = (_o = imm === null || imm === void 0 ? void 0 : imm.data) === null || _o === void 0 ? void 0 : _o.scrap) === null || _p === void 0 ? void 0 : _p.scrapBarcode) || '',
        scrap_reason: ((_r = (_q = imm === null || imm === void 0 ? void 0 : imm.data) === null || _q === void 0 ? void 0 : _q.scrap) === null || _r === void 0 ? void 0 : _r.scrapReason) || 0,
        energy: ((_s = imm === null || imm === void 0 ? void 0 : imm.data) === null || _s === void 0 ? void 0 : _s.energy) || {},
        cycle: ((_t = imm === null || imm === void 0 ? void 0 : imm.data) === null || _t === void 0 ? void 0 : _t.cycle) || {},
        secondarydata: ((_u = imm === null || imm === void 0 ? void 0 : imm.data) === null || _u === void 0 ? void 0 : _u.secondarydata) || {}
    };
    process_1.default.create(data)
        .then((result) => {
        logger_1.default.info('Record saved:', result);
    })
        .catch((error) => {
        logger_1.default.error('Error:', error);
    });
}
exports.crateProcessRecord = crateProcessRecord;
