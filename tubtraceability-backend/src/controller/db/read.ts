import Printer from '../../model/printer';
import Process from '../../model/process'
import logger from "../../utility/logger"

export async function getPrinterConfig(imm: string, type: string) {
  try {
    const printer = await Printer.findOne({
      attributes: ['ip', 'port'],
      where: {
        imm: imm,
        type: type
      }
    });

    if (printer) {
      logger.info('Printer configurations: ', printer.toJSON());
      return printer
    } else {
      logger.warn('Printer configurations not found');
    }
  } catch (error) {
    logger.error('Error:', error);
  }
}

export async function getLatestUniqueID(imm: string) {
  try {
    const latestUniqueID = await Process.max('uniqueid', {
      where: {
        imm: imm
      }
    });

    if (latestUniqueID !== null) {
      logger.info('Latest uniqueid:', latestUniqueID);
      return latestUniqueID
    } else {
      logger.warn('No record found with imm = "imm10"');
    }
  } catch (error) {
    logger.error('Error:', error);
  }
}

export async function getProcessRecord(uniqueid: number) {
  try {
    const process = await Process.findOne({
      where: {
        uniqueid: uniqueid,
      }
    });

    if (process) {
      logger.info('Found process record:', process.toJSON());
      return process
    } else {
      logger.warn('Process record not found');
    }
  } catch (error) {
    logger.error('Error:', error);
  }
}