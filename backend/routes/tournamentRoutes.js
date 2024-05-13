import express from 'express';
import { newTournament } from '../controllers/tournamentRoutesController.js';

const router = express.Router();

router.post('/', newTournament)

export default router;