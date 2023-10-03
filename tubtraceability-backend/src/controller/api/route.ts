import express from 'express';
import { getProcessRecords, getSingleProcessRecord, getMachineStatus } from '../api/get'; // Import the read function

const router = express.Router();

router.get('/process', getProcessRecords);
router.get('/process/:datamatrix', getSingleProcessRecord);
router.get('/status', getMachineStatus);

router.all('*', (req, res) => {
    res.status(404).json({ message: 'End point is not found' });
  });

export default router;
