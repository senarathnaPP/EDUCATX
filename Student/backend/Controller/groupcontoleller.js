const Group = require("../models/groups");


/*get group details*/

const getGroupDetailsByName = async (req, res) => {

    const {name} = req.body;


    Group.findOne({ groupName: name}, (err, user) => {
        try {

            if (user) {

                return res.status(200).json({ message: "group Data fetch", data: user })

            } else {

                return res.status(400).json({ error: "No Data", data: user })
            }




        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server Error" });
        }



    });


}

module.exports = {
    getGroupDetailsByName
}