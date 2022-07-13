const router = require("express").Router();
const { Student } = require('../models/student');
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post("/post", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });

        }

        const student = await Student.findOne({ email: req.body.email });
        if (!student) {
            return res.status(200).send({ message: "Inavalid Email" })
        }

        const validPassword = await bcrypt.compare(
            req.body.password, student.password
        )
        if (!validPassword) {
            return res.status(200).send({ message: "Invalid Password" });
        }

        const token = jwt.sign({ _id: student._id, studentName: student.studentName }, process.env.JWTPRIVATEKEY, { expiresIn: 1440 });

        if ((!student) && (!validPassword)) {
            return res.status(200).send({ message: "Invalid Email and Password" });
        }

        res.status(200).send({ student, message: "Logged in successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internel server error " });
    }
})


const validate = (data) => {
    const schema = joi.object({
        email: joi.string().required().label("Email"),
        password: joi.string().required().label("Password")
    })
    return schema.validate(data);
}


module.exports = router;