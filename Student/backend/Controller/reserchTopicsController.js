
const registerTopic = require("../models/registerResearchTopic");


/*get reserch topic by superviores with pending */

const getOnereserchbySupervisors = async (req, res) => {

    const { name, resStatus } = req.body;


    registerTopic.find({ supervisor: name, status : resStatus}, (err, user) => {
        try {

            if (user) {

                return res.status(200).json({ message: "reserch topic Data fetch", data: user })

            } else {

                return res.status(400).json({ error: "No Data", data: user })
            }




        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server Error" });
        }



    });


}

/*update reserch topic by name*/
const updateReserchbyPending = async (req, res) => {
    registerTopic.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },

    ).then((data) => {
        res.status(200).send({ status: "200", statusmsg: "status updated", data });
    }).catch((err) => {
        console.error(err);
        res.status(500).send({ status: "500", statusmsg: "error with updating data" });

    })
}





module.exports = {
    getOnereserchbySupervisors,
    updateReserchbyPending
}