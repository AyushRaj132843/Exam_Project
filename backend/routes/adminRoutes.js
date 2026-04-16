import express from 'express';
import { getAllUsersAndResults } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users-results', protect, admin, getAllUsersAndResults);

export default router;
