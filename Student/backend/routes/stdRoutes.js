const router = require("express").Router();
const { Student, validate } = require("../models/student");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const student = await Student.findOne({ email: req.body.email });
        if (student) {
            return res.status(200).send({ message: "User exist" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new Student({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "Student Created" })
    } catch (error) {
        res.status(500).send({ message: 'Server error' });
    }

})

router.route("/get").get((req, res) => {
    Student.find().then((students) => {
        res.json(students);
    }).catch((error) => {
        console.log(error);
    })
})

router.route("/update/:id").put((req, res) => {
    let id = req.params.id;
    const { studentName, studentId, email, gender } = req.body;


    const updateStudent = {
        studentName,
        studentId,
        email,
        gender
    }

    const update = Student.findByIdAndUpdate(id, updateStudent).then(() => {

        res.status(200).send({ status: "Student Updated", student: update });
    }).catch((error) => {
        res.status(500).send({ status: "error", error: error });
    })
})

router.route("/get/:id").get((req, res) => {
    const id = req.params.id;
    Student.findById(id).then((student) => {
        res.json(student);
    }).catch((error) => {
        console.log(error);
    })
})

router.route("/delete/:id").delete((req, res) => {
    const id = req.params.id;
    Student.findByIdAndDelete(id).then(() => {
        res.status(200).send({ status: "Student Deleted" });
    }).catch((error) => {
        console.log(error);
    })
})

module.exports = router;