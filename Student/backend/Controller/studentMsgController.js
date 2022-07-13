
const { Student} = require('../models/student')



/* get one student details */
const getStudentDetails = async (req, res) => {
    const { studentId } = req.body;

    Student.find({ studentId: studentId }, (err, data) => {

        if (data) {

            return res.status(200).json({ message: "Data fetch", data: data })

        } else {
            return res.status(400).json({ error: "No Data" })
        }
    })
}





module.exports = {
   getStudentDetails
}