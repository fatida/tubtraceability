import { IIMM } from './common'
export const imm2: IIMM = {
    uniqueid: 0,
    imm: 'IMM2',
    date: '',
    datamatrix: '',
    meta: {
        part: {
            mouldID: '101',
            mouldDescription: '102',
            materialNumber: '103',
            materialDescription: '104',
            barcode: '105',
            barcodeReadTime: '715'
        },
        scrap: {
            scrapBarcode: '109',
            scrapReason: '110',
        },
        energy: {
            shiftkWh: '106',
            shiftkWh_pcs: '107',
            shiftkWh_kg: '108',
        },
        cycle: {
        },
        secondary: {
        },
        production: {
            shiftTotalpart: '724',
            shiftTotalkg: '725',
            oeeHour: '726',
            oeeShift: '727'
        },
        qualitycheckdata: {
        }
    },
    data: {
        part: {
            mouldID: '',
            mouldDescription: '',
            materialNumber: '',
            materialDescription: '',
            barcode: '',
            barcodeReadTime: ''
        },
        scrap: {
            scrapBarcode: '',
            scrapReason: 0,
        },
        energy: {
            shiftkWh: 0,
            shiftkWh_pcs: 0,
            shiftkWh_kg: 0,
        },
        cycle: {
        },
        secondary: {
        },
        production: {
            shiftTotalpart: 0,
            shiftTotalkg: 0,
            oeeHour: 0,
            oeeShift: 0
        },
        qualitycheckdata: {
        }
    },
}
export const imm2Reset: IIMM = {
    uniqueid: 0,
    imm: 'IMM2',
    date: '',
    datamatrix: '',
    meta: {
        part: {
            mouldID: '101',
            mouldDescription: '102',
            materialNumber: '103',
            materialDescription: '104',
            barcode: '105',
            barcodeReadTime: '715'
        },
        scrap: {
            scrapBarcode: '109',
            scrapReason: '110',
        },
        energy: {
            shiftkWh: '106',
            shiftkWh_pcs: '107',
            shiftkWh_kg: '108',
        },
        cycle: {
        },
        secondary: {
        }
    },
    data: {
        part: {
            mouldID: '',
            mouldDescription: '',
            materialNumber: '',
            materialDescription: '',
            barcode: '',
            barcodeReadTime: ''
        },
        scrap: {
            scrapBarcode: '',
            scrapReason: 0,
        },
        energy: {
            shiftkWh: 0,
            shiftkWh_pcs: 0,
            shiftkWh_kg: 0,
        },
        cycle: {
        },
        secondary: {
        }
    },
}
export const imm2Ids = [
    '101', '102', '103',
    '104', '105', '106',
    '107', '108', '109',
    '110'
]