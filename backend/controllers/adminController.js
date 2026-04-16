import User from '../models/User.js';
import Result from '../models/Result.js';

export const getAllUsersAndResults = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).select('-password');
    const results = await Result.find();

    const usersWithResults = users.map(user => {
      const userResults = results.filter(r => r.user.toString() === user._id.toString());
      return {
        ...user._doc,
        results: userResults
      };
    });

    res.json(usersWithResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
