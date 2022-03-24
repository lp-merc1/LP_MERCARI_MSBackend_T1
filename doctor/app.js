const express = require("express");
const cors = require("cors");
const { sequelize, Doctor } = require("./models");
const app = express();
require("dotenv").config();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/:uuid", async (req, res) => {
  try {
    const uuid = req.params.uuid;
    console.log(uuid);
    const doctor = await Doctor.findOne({
      where: {
        uuid,
      },
    });

    return res.json({ doctor });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error" });
  }
});

app.get("/hospital/:id", async (req, res) => {
  try {
    const list = await Doctor.findAll({
      while: {
        hospital: req.params.id,
      },
    });

    return res.json({ data: list });
  } catch (error) {
    return res.json({ message: "Internal Server Error" });
  }
});

const port = process.env.PORT || 5001;

app.listen({ port }, async () => {
  console.log(`Listening on port ${port}`);
  await sequelize.authenticate();
  console.log("Connected to database");
});
