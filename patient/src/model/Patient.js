const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    NHID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String },
    phoneNumber: { type: String, unique: true, required: true },
    xRayReports: [{ type: String }],
    medicalReports: [{ type: String }],
    checkedBy: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const PatientModel = mongoose.model("Patient", PatientSchema);

module.exports = PatientModel;
