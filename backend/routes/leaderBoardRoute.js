import express from "express";
import { leaderBoard, topPlayer } from "../controllers/leaderBoardController.js";


const router = express.Router()

router.get('/', leaderBoard)
router.get('/topPlayer', topPlayer)

export default router