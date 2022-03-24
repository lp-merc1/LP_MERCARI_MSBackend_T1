const express = require("express");
const path = require("path");
const connect = require("./db/connect");
const PatientModel = require("./model/Patient");
const app = express();

require("dotenv").config({ path: "../.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/getImage", async (req, res) => {
  try {
    const file = req.body.file;
    return res.download(path.join(__dirname, "reports", file));
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/:nhid", async (req, res) => {
  try {
    const NHID = req.params.nhid;
    const patient = await PatientModel.findOne({ NHID });

    return res.json({ patient });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
});

const port = process.env.PORT || 5002;

app.listen({ port }, async () => {
  console.log(`Listening on port ${port}`);
  connect();
});
