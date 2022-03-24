const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema({
  patientNHID: { type: String },
  doctorId: { type: Schema.Types.ObjectId },
  timing: { type: Date },
  isBooked: { type: Boolean, default: false },
});

const AppointmentModel = model("Appointment", AppointmentSchema);

module.exports = AppointmentModel;
