import express from 'express';
import { getAllJobs,getJobById, createJob, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { paginate } from '../middleware/pagination.js';
import Job from '../../models/Job.js';

const router = express.Router();

router.get('/', paginate(Job), getAllJobs);
router.get('/:id', getJobById);
router.post('/', protect, restrictTo('recruiter'), createJob);
router.put('/:id', protect, restrictTo('recruiter'), updateJob);
router.delete('/:id', protect, restrictTo('recruiter'), deleteJob);

export default router;