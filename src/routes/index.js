const { Router } = require("express");
const router = Router();

router
  .get("/", (req, res) => {
    res.render("image");
  })
  .get("/images/add", (req, res) => {
    res.render("imageForm");
  });

module.exports = router;
