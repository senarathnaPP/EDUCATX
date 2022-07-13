const MainstaffRegistration = require('../models/staffAuth');



/*Post Staff main  registration */

const postMainStaffRegistration = async(req,res) => {
    let newStaff = new MainstaffRegistration(req.body);

    newStaff.save((err)=>{
        if(err) {
            return res.status(400).json({Error:err});
        }

        return res.status(200).json({
            success: "Staff registerd successfully!",
            status: "200"
        });
    });
}

const mainStaffLogin = async (req, res) => {
   



    const { MainStaffId, MainstfUserPassword } = req.body;
    MainstaffRegistration.findOne({ MainStaffId: MainStaffId }, (err, user) => {
        if (user) {
            if (MainstfUserPassword === user.MainstfUserPassword && MainStaffId === user.MainStaffId) {

                return res.status(200).json({ message: "Login successful!", data: user })
            } else {
                res.status(404).send({ status: "404", statusmsg: "Login Faild" });

            }
        } else {
            return res.status(404).json({ error: "Not registered!" })
        }
    })
    console.log(MainstaffRegistration)
}



module.exports = {
    postMainStaffRegistration,
    mainStaffLogin
}