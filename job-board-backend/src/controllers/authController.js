import * as authService from '../services/authService.js';

export const register = async (req, res, next) => {
  console.log('register',req.body);
  
  try {
    const { email, password, role } = req.body;
    const user = await authService.registerUser(email, password, role);
    res.status(201).json({ message: 'User registered', userId: user._id });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  
  console.log('login details:',req.body);
  
  try {
    const { email, password } = req.body;
    const { token, role } = await authService.loginUser(email, password);
    
    res.json({ token, role });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};