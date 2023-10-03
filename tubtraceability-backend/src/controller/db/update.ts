import Process from '../../model/process'
import Status from '../../model/status' // Import the Status model
import logger from '../../utility/logger'
import WebSocketManager from '../../utility/websocket'

const webSocketManager = WebSocketManager.getInstance()
const io = webSocketManager.getIo()

export async function updateScrapFields(datamatrix: string, newScrapBarcode: string, newScrapReason: number) {
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

export async function updateSecondaryFields(datamatrix: string, qualityCheckBarcode: string, qualityCheckReason: string) {
  try {
    const [updatedRowsCount] = await Process.update(
      {
        secondarydata: {
          qualitycheckBarcode: qualityCheckBarcode,
          qualitycheckReason: qualityCheckReason,
        }
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

export async function updateMachineStatus(machine: string, status: number): Promise<void> {
  try {
    const updatedStatus = await Status.update(
      { status },
      { where: { machine } }
    )
    
    if (updatedStatus[0] === 0) {
      logger.error(`Machine ${machine} is not found`)
    }
    logger.info(`Status for machine ${machine} updated to ${status}`)
    io.emit('statusUpdate', { machine, status })
    
  } catch (error) {
    logger.error(`Status update is failed: ${error}`)
  }
}