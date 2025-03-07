import api from './api.js';

export const getJobs = ({ page = 1, limit = 10, search = '' }) => 
  api.get('/jobs', { params: { page, limit, search } }).then(res => res.data);

export const createJob = (jobData) => 
  api.post('/jobs', jobData);

export const updateApplicationStatus = (id, status) => 
  api.put(`/applications/${id}/status`, { status });