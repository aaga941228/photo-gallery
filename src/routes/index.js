const { Router } = require("express");
const router = Router();
const {
  home,
  renderForm,
  uploadPhoto,
  destroyPhoto,
} = require("../controllers");

router
  .get("/", home)
  .get("/images/add", renderForm)
  .post("/images/add", uploadPhoto)
  .get("/images/delete/:photo_id", destroyPhoto);

module.exports = router;
