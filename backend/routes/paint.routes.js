import express from 'express';
import { getAsianPaintsController, getAsianPaintsCost } from '../controllers/paint.controller.js';

const router = express.Router();

router.get('/asian', getAsianPaintsCost);
router.get('/asian-paints', getAsianPaintsController);

export default router;
