const { Schema, model } = require("mongoose");

const DoctorSchema = new Schema(
  {
    name: { type: String, required: true },
    degree: [{ type: String }],
    profession: [{ type: String }],
    hospital: { type: Schema.Types.ObjectId },
    experience: { type: Number },
    phoneNumber: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const DoctorModel = model("Doctor", DoctorSchema);

module.exports = DoctorModel;
