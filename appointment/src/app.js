const express = require("express");
const connect = require("./db/connect");
const { default: requiresUser } = require("./middleware/requireUser");
const app = express();
const AppointmentModel = require("./model/appointment");

require("dotenv").config({ path: "../.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5003;

app.post("/appointment/book", [requiresUser], async (req, res) => {
  try {
    const patientNHID = res.locals.user.NHID;
    const doctorId = req.body.doctorId;
    const timing = req.body.timing;

    const appointment = await AppointmentModel.create({
      patientNHID,
      doctorId,
      timing,
    });

    return res.json({ success: true, data: appointment });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.post("/appointment/confirm", [requiresUser], async (req, res) => {
  try {
    const user = res.locals.user._id;
    const appointmentId = req.body.appointmentId;

    const appointment = await AppointmentModel.findOne({
      _id: appointmentId,
      doctorId: user,
    });

    if (!appointment) {
      return res.status(404).json({ success: false });
    }

    appointment.isBooked = true;
    await appointment.save();

    return res
      .status(200)
      .json({ success: true, message: "Appoinment Booked" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.listen({ port }, async () => {
  console.log(`Listening on port ${port}`);
  connect();
});
