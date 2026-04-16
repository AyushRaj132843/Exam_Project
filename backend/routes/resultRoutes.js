import express from 'express';
import { saveResult, getMyResults } from '../controllers/resultController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, saveResult)
  .get(protect, getMyResults);

export default router;
