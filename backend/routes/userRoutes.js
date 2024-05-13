import express from 'express'
import protectRoute from '../middleware/protectRoute.js';
import { getGamers, getUsersForSidebar } from '../controllers/userController.js';

const router = express.Router();

router.get('/', protectRoute, getUsersForSidebar)
router.get('/gamers', getGamers)


export default router;