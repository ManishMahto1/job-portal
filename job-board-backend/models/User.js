import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['recruiter', 'candidate'], required: true },
});

export default mongoose.model('User', UserSchema);