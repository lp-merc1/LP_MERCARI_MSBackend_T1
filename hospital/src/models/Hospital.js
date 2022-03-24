const { Schema, model } = require("mongoose");

const HospitalSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const HospitalModel = model("Hospital", HospitalSchema);

module.exports = HospitalModel;
