import mongoose, { Schema } from "mongoose";

const medicalHistorySchema = new Schema({
  treatment: { type: String },
  doctor: { type: String },
  notes: { type: String }
});

const medicationHistorySchema = new Schema({
  medication: { type: String },
  dosage: { type: String }
});

const labResultSchema = new Schema({
  date: { type: Date },
  test: { type: String },
  result: { type: String },
});

const treatmentPlanSchema = new Schema({
  treatmentType: { type: String },
  doctor: { type: String },
  startDate: { type: Date },
  status: { type: String, enum: ['Ongoing', 'Completed', 'Discontinued'] }
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