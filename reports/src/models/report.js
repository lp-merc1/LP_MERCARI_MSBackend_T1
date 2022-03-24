const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    NHID: { type: String, required: true },
    xRayReports: [{ type: String }],
    medicalReports: [{ type: String }],
  },
  { timestamps: true }
);

const ReportModel = mongoose("Report", reportSchema);

module.exports = ReportModel;
