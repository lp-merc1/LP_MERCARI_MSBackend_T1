const express = require("express");
const UserModel = require("./model/User");
const app = express();
const connect = require("./db/connect");
const cors = require("cors");
const { sign, decode } = require("./helper/jwt.utils");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

app.post("/create", async (req, res) => {
  try {
    const { password, type, phoneNumber, id } = req.body;
    const user = await UserModel.create({
      password,
      type,
      phoneNumber,
      id,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
});

app.post("/session", async (req, res) => {
  try {
    const { password, phoneNumber } = req.body;
    const user = await UserModel.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not find" });
    }

    if (!(await user.comparePassword(password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = createAccessToken({ user: user.toJSON() });

    return res.json({ accessToken: accessToken });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server error", success: false });
  }
});

function createAccessToken({ user }) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user },
    { expiresIn: "10d" } // 15 minutes
  );
  return accessToken;
}

app.listen(port, async () => {
  console.log(`Listening on port ${port}`);
  await connect();
});
