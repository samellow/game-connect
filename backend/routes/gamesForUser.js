import  express from 'express';
import { gamesFor, longestWinningStreak } from '../controllers/gamesForUsersController.js';

const router =  express.Router();

router.get('/:userId', gamesFor)
router.get('/streak/:userId', longestWinningStreak)

export default router;