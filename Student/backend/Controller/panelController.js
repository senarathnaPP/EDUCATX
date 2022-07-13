
const panel = require('../models/panels')





/*get panel by supervior*/

const getPaneletailsByName = async (req, res) => {

    const {name} = req.body;

    panel.find({"memberName.memberName":name}, (err, user) => {
    // panel.find({ memberName: [{memberName : memberName}]}, (err, user) => {
        try {

            if (user) {

                return res.status(200).json({ message: "group Data fetch", data: user,data1: err })

            } else {

                return res.status(400).json({ error: "No Data", data: user })
            }




        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server Error" });
        }



    })


}


const getPaneletailsByID = async (req, res) => {

    const {name} = req.body;

    panel.find({ panelId :name }, (err, user) => {
    // panel.find({ memberName: [{memberName : memberName}]}, (err, user) => {
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



    })


}











module.exports = {
    getPaneletailsByName,
    getPaneletailsByID
}