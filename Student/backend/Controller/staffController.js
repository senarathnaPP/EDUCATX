const staffRegistration = require('../models/staff');



/*Post Staff registration */

const postStaffRegistration = async (req, res) => {
    let newStaff = new staffRegistration(req.body);

    newStaff.save((err) => {
        if (err) {
            return res.status(400).json({ Error: err });
        }

        return res.status(200).json({
            success: "Staff registerd successfully!",
            status: "200"
        });
    });
}

/*Get all register Staff */

const getAllStaff = async (req, res) => {
    try {
        const staffData = await staffRegistration.find()
        return res.status(200).send({
            status: "200",
            data: staffData
        })
    } catch (err) {
        return res.status(500).send({
            status: "500",
            err: err
        })
    }
}

/*Update staff */

const updateStaff = async (req, res) => {
    staffRegistration.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },

    ).then(() => {
        res.status(200).send({ status: "200", statusmsg: "user updated" });
    }).catch((err) => {
        console.error(err);
        res.status(500).send({ status: "500", statusmsg: "error with updating data" });

    })
}

/*get one staff user */

const getOneStaffUser = async (req, res) => {

    const { staffUser } = req.body;
   

       staffRegistration.findOne({ stfStaffId:staffUser }, (err,user) =>{
        try {

            if(user){

                return res.status(200).json({ message: "staff Data fetch", data: user })

            }else{

                return res.status(400).json({ error: "No Data" , data:user })
            }




        } catch (error) {
            console.error(error);
           return res.status(500).json({ message: "Server Error" });
        }
    

        
       });
       

}

/*Delete Staff user */

const deleteStaffUser = async (req, res) => {

    staffRegistration.findByIdAndDelete(
        req.params.id
    ).then(() => {
        res.status(200).send({ status: "200", statusmsg: "user deleted" });
    }).catch((err) => {
        console.error(err);
        res.status(500).send({ status: "500", statusmsg: "error with deleting data" });

    })

}

const StaffLogin = async (req, res) => {

    const { email, password } = req.body;
    staffRegistration.findOne({ stfStaffId: email }, (err, user) => {

        try {

            if (user) {

                if (user.stfUserActive == "Y") {
                    if (password === user.stfUserPassword && email === user.stfStaffId) {

                        return res.status(200).json({ message: "Login successful!", data: user })
                    } else {
                        return res.status(200).json({ message: "Invalid email or password!" })
                    }
                } else {

                    return res.status(200).json({ message: "Your Account is inactive please contact your administartor !" })
                }

            } else {
                return res.status(200).json({ message: "Not registered!" })
            }

        } catch (error) {

            console.error(error);
            res.status(500).json({ message: "Server Error" });
        }


    })

}



const getAllSupervisors = async (req, res) => {
    const stfJobRole = "Supervisor";
    try {

        const user = await staffRegistration.find({ stfJobRole: stfJobRole });
        return res.status(200).json({ data: user })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }

}


/* get one staff details */
const getStaffDetails = async (req, res) => {
    const { stfStaffId } = req.body;

    staffRegistration.find({ stfStaffId: stfStaffId }, (err, data) => {

        if (data) {

            return res.status(200).json({ message: "staff Data fetch", data: data })

        } else {
            return res.status(400).json({ error: "No Data" })
        }
    })
}





module.exports = {
    postStaffRegistration,
    getAllStaff,
    updateStaff,
    getOneStaffUser,
    deleteStaffUser,
    StaffLogin,
    getAllSupervisors,
    getStaffDetails
}