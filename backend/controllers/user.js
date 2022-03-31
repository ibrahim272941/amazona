import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

export const loginController = expressAsyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error('User not found');
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new Error('Password is incorrect');
    const token = generateToken(user);
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    const newError = new Error(error.message ?? 'Login failed');
    newError.statusCode = 401;
    next(newError);
  }
});

export const signupController = expressAsyncHandler(async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      throw new Error('Validation Error');
    }
    const cryptedPassword = bcrypt.hashSync(password);
    const newUser = new User({
      name,
      email,
      password: cryptedPassword,
    });
    const response = await newUser.save();
    res.status(204).json({ message: 'user added' });
  } catch (error) {
    next(error);
  }
});
export const deleteController = expressAsyncHandler(
  async (req, res, next) => {}
);
export const updateController = expressAsyncHandler(
  async (req, res, next) => {}
);
export const getByIdController = expressAsyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const authenticatedhUser = req.authenticatedhUser; // get user from token
    if (authenticatedhUser._id.toString() !== id.toString()) {
      throw new Error('Not authenticated');
    }
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
