const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema({
  patientNHID: { type: String },
  doctorId: { type: String },
  timing: { type: Date },
  isBooked: { type: Boolean, default: false },
});

const AppointmentModel = model("Appointment", AppointmentSchema);

module.exports = AppointmentModel;
