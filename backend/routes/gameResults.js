import express from 'express'
import { gameResults } from '../controllers/gameResultsController.js';

const router = express.Router();

router.post('/',gameResults )

export default router;