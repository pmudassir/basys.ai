import mongoose, { Schema } from "mongoose";

const medicalHistorySchema = new Schema({
  date: { type: Date, required: true },
  treatment: { type: String, required: true },
  doctor: { type: String, required: true },
  notes: { type: String, required: false }
});

const medicationHistorySchema = new Schema({
  medication: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  dosage: { type: String, required: true }
});

const labResultSchema = new Schema({
  date: { type: Date, required: true },
  test: { type: String, required: true },
  result: { type: String, required: true },
  doctor: { type: String, required: true }
});

const treatmentPlanSchema = new Schema({
  treatmentType: { type: String, required: true },
  doctor: { type: String, required: true },
  startDate: { type: Date, required: true },
  status: { type: String, enum: ['Ongoing', 'Completed', 'Discontinued'], required: true }
});

const patientSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  medicalHistory: [medicalHistorySchema],
  medicationHistory: [medicationHistorySchema],
  labResults: [labResultSchema],
  treatmentPlan: treatmentPlanSchema
});

export default mongoose.model("Patient", patientSchema)