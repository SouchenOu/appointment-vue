import express from 'express';
import { createApointements, deleteApointements, getAllApointements, updateApointements } from '../controllers/Appointements.js';
const router = express.Router();

router.get('/appointments', getAllApointements);
router.post('/appointments', createApointements);
router.put('/appointments/:id', updateApointements);
router.delete('/appointments/:id', deleteApointements)
   

export default router;