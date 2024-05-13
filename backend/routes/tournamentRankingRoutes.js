import express from 'express';
import { getTournamentRanking } from '../controllers/tournamentRankingRoutesController.js';

const router = express.Router();

router.post('/',getTournamentRanking )

export default router