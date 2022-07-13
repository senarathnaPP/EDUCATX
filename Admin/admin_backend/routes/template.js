const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const Template = require("../models/template");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new Template
    let template = new Template({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save template
    await template.save();
    res.json(template);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    let template = await Template.find();
    res.json(template);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find template by id
    let template = await Template.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(template.cloudinary_id);
    // Delete template from db
    await template.remove();
    res.json(template);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    let template = await Template.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(template.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      name: req.body.name || template.name,
      avatar: result?.secure_url || template.avatar,
      cloudinary_id: result?.public_id || template.cloudinary_id,
    };
    template = await Template.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(template);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Find template by id
    let template = await Template.findById(req.params.id);
    res.json(template);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
