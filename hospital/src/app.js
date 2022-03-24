const express = require("express");
const HospitalModel = require("./models/Hospital");
const connect = require("./db/connect");
const app = express();
const cors = require("cors");

require("dotenv").require();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5003;

app.get("/", async (req, res) => {
  try {
    const hospitalList = await HospitalModel.find({});

    return res.json({ data: hospitalList });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
});

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  await connect();
});
