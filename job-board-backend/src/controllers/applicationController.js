import * as applicationService from '../services/applicationService.js';

export const createApplication = async (req, res, next) => {
  try {
    const { jobId, resumeLink } = req.body;
    const resumeUrl = resumeLink || (req.file ? `/uploads/${req.file.filename}` : null);
    const application = await applicationService.createApplication({
      candidateId: req.user.id,
      jobId,
      resumeUrl,
    });
    res.status(201).json({ id: application._id });
  } catch (err) {
    next(err);
  }
};

export const getApplications = async (req, res, next) => {
  try {
    const applications = await applicationService.getApplications(req.user);
    res.json(applications);
  } catch (err) {
    next(err);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    await applicationService.updateApplicationStatus(req.params.id, req.user.id, req.body.status);
    res.json({ message: 'Status updated' });
  } catch (err) {
    next(err);
  }
};