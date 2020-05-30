const mongoose = require("mongoose");
const { uri } = require("./config");

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => console.log("db is connected"))
  .catch((err) => console.error(err));
