import mongoose, { Schema } from "mongoose";

const authRequestSchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  treatmentType: { type: String, required: true },
  insurancePlan: { type: String, required: true },
  dateOfService: { type: Date, required: true },
  diagnosisCode: { type: String, required: true },
  doctorNotes: { type: String, required: true },
  requestStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Denied'],
    default: 'Pending'
  },
}, { timestamps: true });

export default mongoose.model('AuthRequest', authRequestSchema)