const express = require("express");
const { sequelize, User, Session } = require("./models");
const app = express();
const { sign } = require("./jwt.utils");

require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, type, NHID } =
      req.body;

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      password,
      type,
      NHID,
    });

    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user.comparePassword(password)) {
      return res.status(403).json({ messgae: "Invalid Password" });
    }

    const session = await Session.create({
      user: user.uuid,
      valid: true,
      userAgent: req.get("user-agent") || "",
    });

    const accessToken = createAccessToken({
      user: user.toJSON(),
      session,
    });

    return res.send({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

function createAccessToken({ user, session }) {
  // Build and return the new access token
  const accessToken = sign(
    { ...user, session: session.uuid },
    { expiresIn: "10d" } // 15 minutes
  );
  return accessToken;
}

app.listen({ port }, async () => {
  console.log(`Auth Listening on port ${port}`);

  await sequelize.authenticate();

  console.log("Database connected");
});
