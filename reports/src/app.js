const express = require("express");
const cors = require("cors");
const { default: connect } = require("./db/connect");
const UserModel = require("./models/report");
const ReportModel = require("./models/report");
const app = require(app);
require("dotenv").config();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/:NHID", async (req, res) => {
  try {
    const NHID = req.parmas.NHID;

    const user = await ReportModel.findOne({ NHID });

    return res.send(user);
  } catch (error) {}
});

const port = process.env.PORT || 5001;

app.listen({ port }, async () => {
  console.log(`Listening on port ${port}`);
  connect();
});
