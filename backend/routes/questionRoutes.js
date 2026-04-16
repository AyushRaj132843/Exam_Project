import express from 'express';
import { getQuestionsBySubject, createQuestion, updateQuestion, deleteQuestion, getAllQuestions } from '../controllers/questionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/all', protect, admin, getAllQuestions);
router.get('/:subject', getQuestionsBySubject); // Assuming open to logged-in users, or public? Leave as is to avoid breaking existing exam logic
router.post('/', protect, admin, createQuestion);
router.put('/:id', protect, admin, updateQuestion);
router.delete('/:id', protect, admin, deleteQuestion);

export default router;
