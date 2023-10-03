
import Process from '../../model/process'
import Status from '../../model/status'
import logger from "../../utility/logger"
import { Request, Response } from 'express'
import { Op } from 'sequelize';


export async function getProcessRecords(req: Request, res: Response) {
    try {
        let queryParameters = req.query;
        let whereCondition = {};

        if (queryParameters.imm) {
            whereCondition = { imm: queryParameters.imm };
        }

        if (queryParameters.startDate && queryParameters.endDate) {
            whereCondition = {
                ...whereCondition,
                createdAt: {
                    [Op.between]: [queryParameters.startDate, queryParameters.endDate]
                }
            };
        }

        const records = await Process.findAll({
            where: whereCondition,
            limit: 1000,
            order: [['createdAt', 'DESC']],
            attributes: ['imm', 'date', 'datamatrix', 'mouldid', 'moulddescription', 'materialnumber', 'materialdescription', 'barcode']
        });

        res.json(records);
    } catch (error) {
        logger.error(`Failure on getProcessRecords Request: ${error}`)
        res.status(500).send('Internal Server Error')
    }
}

export async function getSingleProcessRecord(req: Request, res: Response) {
    try {
        const datamatrix = req.params.datamatrix;
        const record = await Process.findOne({ where: { datamatrix } });

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.json(record);
    } catch (error) {
        logger.error(`Failure on getSingleProcessRecord Request: ${error}`)
        res.status(500).send('Internal Server Error');
    }
}

export async function getMachineStatus(req: Request, res: Response) {
    try {
        const statuses = await Status.findAll();
        res.json(statuses);
    } catch (error) {
        logger.error(`Failure on getMachineStatus Request: ${error}`)
        res.status(500).send('Internal Server Error');
    }
}