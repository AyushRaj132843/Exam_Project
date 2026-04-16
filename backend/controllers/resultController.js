import Result from '../models/Result.js';

export const saveResult = async (req, res) => {
  const { subject, score, total } = req.body;

  try {
    const result = new Result({
      user: req.user._id,
      subject,
      score,
      total
    });

    const createdResult = await result.save();
    res.status(201).json(createdResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user._id });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
