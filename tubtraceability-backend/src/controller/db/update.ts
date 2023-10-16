import Process from '../../model/process'
import Status from '../../model/status' // Import the Status model
import logger from '../../utility/logger'
import WebSocketManager from '../../utility/websocket'

const webSocketManager = WebSocketManager.getInstance()
const io = webSocketManager.getIo()

export async function updateScrapFields(scrapBarcode: string, scrapReason: number) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const existingRecord = await Process.findOne({
        where: {
          datamatrix: scrapBarcode,
        },
      });

      if (existingRecord) {
        await Process.update(
          {
            scrap_barcode: scrapBarcode,
            scrap_reason: scrapReason,
          },
          {
            where: {
              datamatrix: scrapBarcode,
            },
          }
        );

        logger.info(`Scrap fields are updated for ${scrapBarcode}.`);
        resolve(); // Resolve the promise if update is successful
      } else {
        logger.error(`Record with datamatrix ${scrapBarcode} not found.`);
        reject(new Error(`Record with datamatrix ${scrapBarcode} not found.`)); // Reject the promise if record is not found
      }
    } catch (error) {
      logger.error('Error updating scrap fields:', error);
      reject(error); // Reject the promise in case of an error
    }
  });
}


// export async function updateQualityCheckFields(qualityCheckReadTime: string, qualityCheckBarcode: string, qualityCheckResult: string, qualityCheckReason: string) {
//   try {
//     await Process.update(
//       {
//         qualitycheckdata: {
//           qcReadTime: qualityCheckReadTime,
//           qcBarcode: qualityCheckBarcode,
//           qcResult: qualityCheckResult,
//           qcReason: qualityCheckReason  
//         }
//       },
//       {
//         where: {
//           datamatrix: qualityCheckBarcode,
//         },
//       }
//     )

//     logger.info(`Quality Check data fields are updated for ${qualityCheckBarcode} rows.`)
//   } catch (error) {
//     logger.error('Error updating Quality Check fields:', error)
//   }
// }

export async function updateQualityCheckFields(qualityCheckReadTime: string, qualityCheckBarcode: string, qualityCheckResult: string, qualityCheckReason: string) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const existingRecord = await Process.findOne({
        where: {
          datamatrix: qualityCheckBarcode,
        },
      });

      if (existingRecord) {
        await Process.update(
      {
        qualitycheckdata: {
          qcReadTime: qualityCheckReadTime,
          qcBarcode: qualityCheckBarcode,
          qcResult: qualityCheckResult,
          qcReason: qualityCheckReason  
        }
      },
      {
        where: {
          datamatrix: qualityCheckBarcode,
        },
      }
        );

        logger.info(`Quality check fields are updated for ${qualityCheckBarcode}.`);
        resolve(); // Resolve the promise if update is successful
      } else {
        logger.error(`Record with datamatrix ${qualityCheckBarcode} not found.`);
        reject(new Error(`Record with datamatrix ${qualityCheckBarcode} not found.`)); // Reject the promise if record is not found
      }
    } catch (error) {
      logger.error('Error updating quality check fields:', error);
      reject(error); // Reject the promise in case of an error
    }
  });
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