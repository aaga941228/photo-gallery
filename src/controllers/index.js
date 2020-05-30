const cloudinary = require("cloudinary");
const fs = require("fs-extra");
const {
  cloudinary_cloud_name,
  cloudinary_api_key,
  cloudinary_api_secret,
} = require("../config");
const Photo = require("../models/photo");

cloudinary.config({
  cloud_name: cloudinary_cloud_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
});

async function home(req, res) {
  const photos = await Photo.find();
  res.render("image", {
    photos,
    helpers: {
      imageURL: function () {
        return this.imageURL;
      },
    },
  });
}

async function renderForm(req, res) {
  const photos = await Photo.find();
  res.render("imageForm", {
    photos,
    helpers: {
      imageURL: function () {
        return this.imageURL;
      },
      title: function () {
        return this.title;
      },
      description: function () {
        return this.description;
      },
      _id: function () {
        return this._id;
      },
    },
  });
}

async function uploadPhoto(req, res) {
  const response = await cloudinary.v2.uploader.upload(req.file.path);
  const photo = new Photo({
    title: req.body.title,
    description: req.body.description,
    imageURL: response.url,
    public_id: response.public_id,
  });
  await photo.save();
  await fs.unlink(req.file.path);

  res.redirect("/");
}

async function destroyPhoto(req, res) {
  const photo = await Photo.findByIdAndDelete(req.params.photo_id);
  const response = await cloudinary.v2.uploader.destroy(photo.public_id);
  res.redirect("/images/add");
}

module.exports = { home, renderForm, uploadPhoto, destroyPhoto };
