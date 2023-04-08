import express from 'express';
import { getAsianPaintsCost } from '../controllers/paint.controller.js';

const router = express.Router();

router.get('/asian', getAsianPaintsCost);

export default router;
