const express = require("express");
const multer = require("multer");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const config = require("./config");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() + path.extname(file.originalname).toLowerCase()
    );
  },
});
app.use(multer({ storage }).single("image"));

app.listen(config.port, () => {
  console.log(`server on port ${config.port}`);
});
