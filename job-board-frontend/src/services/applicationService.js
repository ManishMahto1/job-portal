import api from './api.js';

export const createApplication = (formData) => 
  api.post('/applications', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getApplications = () => 
  api.get('/applications').then(res => res.data);