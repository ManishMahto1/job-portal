import mongoose from 'mongoose';


const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Job = mongoose.model('Job', JobSchema);
export default Job;