const { Schema, model } = require("mongoose");

const DoctorSchema = new Schema(
  {
    name: { type: String, required: true },
    degree: [{ type: String }],
    profession: [{ type: String }],
    hospital: { type: Schema.Types.ObjectId },
    experience: { type: Number },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

const DoctorModel = model("Doctor", DoctorSchema);
