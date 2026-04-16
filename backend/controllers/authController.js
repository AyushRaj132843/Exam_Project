import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  const { username, lastname, enrollmentNumber, password } = req.body;

  try {
    const query = enrollmentNumber ? { enrollmentNumber } : { username };
    const userExists = await User.findOne(query);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      lastname,
      enrollmentNumber,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        enrollmentNumber: user.enrollmentNumber,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, enrollmentNumber, password } = req.body;

  try {
    const query = enrollmentNumber ? { enrollmentNumber } : { username };
    const user = await User.findOne(query);

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        enrollmentNumber: user.enrollmentNumber,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
