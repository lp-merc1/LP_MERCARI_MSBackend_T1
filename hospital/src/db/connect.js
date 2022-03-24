const mongoose = require("mongoose");

function connect() {
  const dbUri = process.env.DB_URL;
  return mongoose
    .connect(dbUri)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("db error", error);
      process.exit(1);
    });
}
module.exports = connect;
