import express from 'express';
import { tournamentResults } from '../controllers/tournamentResultsRoutesController.js';

const router = express.Router();

router.post('/', tournamentResults)

export default router;