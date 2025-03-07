import express from 'express';
import { createApplication, getApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import { protect, restrictTo } from '../middleware/auth.js';
import { upload } from '../utils/fileUpload.js';

const router = express.Router();

router.post('/', protect, restrictTo('candidate'), upload.single('resume'), createApplication);
router.get('/', protect, getApplications);
router.put('/:id/status', protect, restrictTo('recruiter'), updateApplicationStatus);

export default router;