const router = require("express").Router();
const Template = require("../models/template");


router.get("/", async (req, res) => {
  try {
    let template = await Template.find();
    res.json(template);
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;
