import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

export const registerUser = async (email, password, role) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('Email already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword, role });
  return await user.save();
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  //console.log(user);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  
  return { token, role: user.role };
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};