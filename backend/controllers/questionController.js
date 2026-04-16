import Question from '../models/Question.js';

export const getQuestionsBySubject = async (req, res) => {
  try {
    const questions = await Question.find({ subject: req.params.subject });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createQuestion = async (req, res) => {
  const { subject, question, options, answer } = req.body;

  try {
    const newQuestion = new Question({
      subject,
      question,
      options,
      answer
    });

    const createdQuestion = await newQuestion.save();
    res.status(201).json(createdQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { subject, question, options, answer } = req.body;

  try {
    const q = await Question.findById(req.params.id);

    if (q) {
      q.subject = subject || q.subject;
      q.question = question || q.question;
      q.options = options || q.options;
      q.answer = answer || q.answer;

      const updatedQuestion = await q.save();
      res.json(updatedQuestion);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const q = await Question.findById(req.params.id);

    if (q) {
      await q.deleteOne();
      res.json({ message: 'Question removed' });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
