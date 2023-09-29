import process from '../../model/process';
import logger from '../../utility/logger'
import {IIMM} from '../../dataset/common'

export function crateProcessRecord(imm : IIMM){
    const data = {
        uniqueid: imm?.uniqueid || 0,
        imm: imm?.imm || '',
        date:imm?.date || '',
        datamatrix: imm?.datamatrix || '',
        mouldid: imm?.data?.part?.mouldID || '',
        moulddescription: imm?.data?.part?.mouldDescription || '',
        materialnumber: imm?.data?.part?.materialNumber || '',
        materialdescription: imm?.data?.part?.materialDescription || '',
        barcode: imm?.data?.part?.barcode || '',
        weight: imm?.data?.part?.weight || 0, 
        scrap_barcode: imm?.data?.scrap?.scrapBarcode || '',
        scrap_reason: imm?.data?.scrap?.scrapReason || 0,
        energy: imm?.data?.energy || {},
        cycle: imm?.data?.cycle || {},
        secondarydata:imm?.data?.secondarydata || {}
    }

    process.create(data)
    .then((result) => {
      logger.info('Record saved:', result);
    })
    .catch((error) => {
      logger.error('Error:', error);
    });  

}




