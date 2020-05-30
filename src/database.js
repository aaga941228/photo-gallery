const mongoose = require("mongoose");
const { mongodb_uri } = require("./config");

mongoose
  .connect(mongodb_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.log("db is connected"))
  .catch((err) => console.error(err));
