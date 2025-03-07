import api from './api.js';

export const register = (email, password, role) => 
  api.post('/auth/register', { email, password, role });

export const login = (email, password) => 
  api.post('/auth/login', { email, password }).then(res => res.data);

export const getMe = () => 
  api.get('/auth/user').then(res => res.data);