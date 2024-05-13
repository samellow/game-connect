import express from 'express';
import { generateFixtures } from '../controllers/fixturesRoutesController.js';

const router = express.Router();

router.post('/',generateFixtures)

export default router;