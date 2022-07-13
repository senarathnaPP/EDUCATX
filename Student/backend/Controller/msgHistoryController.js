const msgHistory = require('../models/messageHistory')

/* Post message */

const postHistoryMesage = async (req, res) => {
    let newHistoryMessage = new msgHistory(req.body);

    newHistoryMessage.save((err) => {
        if (err) {
            return res.status(400).json({ Error: err });
        }

        return res.status(200).json({
            success: "Message History data successfully inserted !",
            status: "200"
        });
    });
}



const getHistoryMsgByName = async (req, res) => {
    const { personOne, personTwo, groupNumber } = req.body;

    msgHistory.find({ personOne: personOne, personTwo: personTwo, groupNumber: groupNumber }, (err, Msg) => {

        if (Msg) {


            return res.status(200).json({ message: "Alredy Have", data: Msg })

        } else {
            return res.status(400).json({ error: "No Data" })
        }
    })
}



const getHistoryMsgBySennder = async (req, res) => {
    const { personOne  } = req.body;

    msgHistory.find({
        "$or": [{
            "personOne": personOne
        }, {
            "personTwo": personOne
        }]
        
    }, (err, Msg) => {

        if (Msg) {


            return res.status(200).json({ message: "succesfull", data: Msg })

        } else {
            return res.status(400).json({ error: "No Data" })
        }
    });

    // const data = personOne ? personOne : per
    // msgHistory.find({ personOne: personOne , personTwo: personTwo}, (err, Msg) => {

    //     if (Msg) {


    //         return res.status(200).json({ message: "succesfull", data: Msg })

    //     } else {
    //         return res.status(400).json({ error: "No Data" })
    //     }
    // })
}

module.exports = {
    postHistoryMesage,
    getHistoryMsgByName,
    getHistoryMsgBySennder
}