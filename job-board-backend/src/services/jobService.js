import Job from '../../models/Job.js';

export const getAllJobs = async (query) => {
  const { skip, limit } = query;
  return await Job.find({ status: 'open' }).skip(skip).limit(limit);
};

export const getJobById = async (id) => {
  const job = await Job.findById(id);
  if (!job || job.status !== 'open') throw new Error('Job not found');
  return job;
};
export const createJob = async (jobData) => {
  const job = new Job(jobData);
  return await job.save();
};

export const updateJob = async (id, recruiterId, updates) => {
  const job = await Job.findOneAndUpdate({ _id: id, recruiterId }, updates, { new: true });
  if (!job) throw new Error('Not authorized or job not found');
  return job;
};

export const deleteJob = async (id, recruiterId) => {
  const job = await Job.findOneAndDelete({ _id: id, recruiterId });
  if (!job) throw new Error('Not authorized or job not found');
};