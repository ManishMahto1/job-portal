import Application from '../../models/Application.js';
import Job from '../../models/Job.js';
import { parseResume } from './resumeParser.js';

export const createApplication = async ({ candidateId, jobId, resumeUrl }) => {
  if (!resumeUrl) throw new Error('Resume file or link required');
  const parsedFields = await parseResume(jobId,resumeUrl);
  console.log(`Parsed fields for application: ${JSON.stringify(parsedFields)}`);
  
  const application = new Application({ candidateId, jobId, resumeUrl, parsedFields });
  return await application.save();
};

export const getApplications = async (user) => {
  const query = user.role === 'recruiter'
    ? { jobId: { $in: await Job.find({ recruiterId: user.id }).distinct('_id') } }
    : { candidateId: user.id };
  return await Application.find(query);
};

export const updateApplicationStatus = async (id, recruiterId, status) => {
  const application = await Application.findOneAndUpdate(
    { _id: id, jobId: { $in: await Job.find({ recruiterId }).distinct('_id') } },
    { status },
    { new: true }
  );
  if (!application) throw new Error('Not authorized or application not found');
};