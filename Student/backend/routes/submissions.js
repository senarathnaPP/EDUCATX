const router = require("express").Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../helpers/fileHelper');
const submission = require('../models/submissions');



router.post("/submissions/add", upload.single('file'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        let submissions = new submission({
            groupName: req.body.groupName,
            avatar: result.secure_url,
            cloudinary_id: result.public_id

        })

        await submissions.save();
        res.json(submissions)
    } catch (error) {
        console.log(error)
    }
});

router.get("/submissions/get", async (req, res) => {
    try {
        let sub = await submission.find();
        res.json(sub);
    } catch (error) {
        console.log(error);
    }
})

router.delete("/submissions/:id", async (req, res) => {
    try {
        let sub = await submission.findById(req.params.id);
        await cloudinary.uploader.destroy(sub.cloudinary_id);
        await sub.remove();
        res.json(sub);
    } catch (error) {
        console.log(error);
    }
})

router.put("/submissions/update/:id", upload.single('file'), async (req, res) => {
    try {
        let sub = await submission.findById(req.params.id);
        await cloudinary.uploader.destroy(sub.cloudinary_id);

        let result
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const data = {
            groupName: req.body.groupName || sub.groupName,
            avatar: result?.secure_url || sub.avatar,
            cloudinary_id: result?.public_id || sub.cloudinary_id
        }

        sub = await submission.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json(sub);
    } catch (error) {
        console.log(error);
    }
})

router.get("/submissions/get/:id", async (req, res) => {
    try {
        const id = (req.params.id)
        let sub = await submission.findById(id);
        res.json(sub);
    } catch (error) {
        console.log(error);
    }
})


router.post("/submissions/get/gropupname", async (req, res) => {
    try {
        const {groupname } = req.body;
        let sub = await submission.find({groupName:groupname});
        res.json(sub);
    } catch (error) {
        console.log(error);
    }
})





module.exports = router