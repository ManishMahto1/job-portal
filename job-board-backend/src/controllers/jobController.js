import * as jobService from '../services/jobService.js';

export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getAllJobs(req.query);
    res.json(jobs);
  } catch (err) {
    next(err);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    res.json(job);
  } catch (err) {
    next(err);
  }
};
export const createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob({ ...req.body, recruiterId: req.user.id });
    res.status(201).json({ id: job._id });
  } catch (err) {
    next(err);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await jobService.updateJob(req.params.id, req.user.id, req.body);
    res.json({ message: 'Job updated' });
  } catch (err) {
    next(err);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    await jobService.deleteJob(req.params.id, req.user.id);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    next(err);
  }
};