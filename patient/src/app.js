const express = require("express");
const path = require("path");
const cors = require("cors");
const connect = require("./db/connect");
const PatientModel = require("./model/Patient");
const app = express();
const axios = require("axios");
const { generateNHID } = require("./helper/NHID");

require("dotenv").config({ path: "../.env" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Get the Image
app.get("/getImage/:file", async (req, res) => {
  try {
    const file = req.params.file;
    return res.download(path.join(__dirname, "reports", file));
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get the patient by NHID
app.get("/:nhid", async (req, res) => {
  try {
    const NHID = req.params.nhid;
    const patient = await PatientModel.findOne({ NHID });

    return res.json({ patient: [patient] });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

// Create the patients
app.post("/create", async (req, res) => {
  try {
    const { name, gender, age, address, phoneNumber, password } = req.body;

    const NHID = generateNHID();

    const patient = await PatientModel.create({
      name,
      gender,
      age,
      address,
      phoneNumber,
      NHID,
    });

    await axios.post(`${process.env.CREATE_USER_URL}/create`, {
      password,
      phoneNumber,
      id: NHID,
      type: "Patient",
    });

    return res.json({
      success: true,
      message: "User Created . Login to continue",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
});

// Get the patient list
app.get("/", async (req, res) => {
  try {
    const patients = await PatientModel.find({});
    return res.json({ patients });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

const port = process.env.PORT || 5002;

app.listen({ port }, async () => {
  console.log(`Listening on port ${port}`);
  connect();
});
