const express = require("express");
const app = express();
const connect = require("./db/connect");
const DoctorModel = require("./models/Doctor");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5003;

app.post("/create", async (req, res) => {
  try {
    const {
      name,
      degree,
      profession,
      hospital,
      experience,
      phoneNumber,
      password,
    } = req.body;

    const doctor = await DoctorModel.create({
      name,
      degree,
      profession,
      hospital,
      experience,
      phoneNumber,
    });

    await axios.post(`${process.env.CREATE_USER_URL}/create`, {
      password,
      phoneNumber,
      id: doctor._id,
      type: "Doctor",
    });

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const doctor = await DoctorModel.findById(id);

    return res.status(200).json({ doctor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
});

app.get("/hospital/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const doctor = await DoctorModel.find({ hospital: id });

    return res.json({ doctor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
});

app.listen(port, async (req, res) => {
  console.log(`Listening on ${port}`);
  await connect();
});
