import Process from '../../model/process'
import logger from '../../utility/logger'

export async function updateScrapFields(datamatrix: string, newScrapBarcode: string, newScrapReason: number){
  try {
    const [updatedRowsCount] = await Process.update(
      {
        scrap_barcode: newScrapBarcode,
        scrap_reason: newScrapReason,
      },
      {
        where: {
          datamatrix: datamatrix,
        },
      }
    )

    logger.info(`Updated ${updatedRowsCount} rows.`)
  } catch (error) {
    logger.error('Error updating scrap fields:', error)
  }
}

