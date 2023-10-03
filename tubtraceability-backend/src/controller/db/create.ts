import process from '../../model/process'
import logger from '../../utility/logger'
import { IIMM } from '../../dataset/common'
import WebSocketManager from '../../utility/websocket'

const webSocketManager = WebSocketManager.getInstance()
const io = webSocketManager.getIo()

export function crateProcessRecord(imm: IIMM) {
  const data = {
    uniqueid: imm?.uniqueid || 0,
    imm: imm?.imm || '',
    date: imm?.date || '',
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
    secondarydata: imm?.data?.secondarydata || {}
  }

  process.create(data)
    .then((result) => {
      
      logger.info('Process record saved on process table: ' + JSON.stringify(result))

      const imm = result.imm
      const datamatrix = result.datamatrix
      const mouldid = result.mouldid
      const moulddescription = result.moulddescription
      const materialnumber = result.materialnumber
      const materialdescription = result.materialdescription
      const barcode = result.barcode
      const date = result.date

      io.emit('processRecord', {
        imm,
        datamatrix,
        mouldid,
        moulddescription,
        materialnumber,
        materialdescription,
        barcode,
        date
      })
    })
    .catch((error) => {
      logger.error('Process record saving failure: ', error)
    })

}