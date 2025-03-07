import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  resumeUrl: { type: String, required: true },
  parsedFields: { type: Object, default: {} },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

export default mongoose.model('Application', ApplicationSchema);