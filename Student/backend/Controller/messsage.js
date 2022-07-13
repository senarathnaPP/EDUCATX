const message = require('../models/Message')


/* Post message */

const postMesage = async(req,res) => {
    let newMessage = new message(req.body);

    newMessage.save((err)=>{
        if(err) {
            return res.status(400).json({Error:err});
        }

        return res.status(200).json({
            success: "Message successfully!",
            status: "200"
        });
    });
}


/* Get one message */

const getMsgfillter = async (req, res) => {


    const {staffId, studentId } = req.body;
    message.find({ staffId: staffId , studentId:studentId }, (err, Msg) => {
        if (Msg) {
            

                return res.status(200).json({ message: "Message Retrived", data: Msg })
           
        } else {
            return res.status(400).json({ error: "Message not Retrived" })
        }
    })
}



const getbyDatebySennder = async (req, res) => {


    const {staffId, studentId , sennder } = req.body;

    // message.find().sort({'timestamp': -1 })

    message.find({ staffId: staffId , studentId:studentId , sennder:sennder}, (err, Msg) => {
        if (Msg) {
            

                return res.status(200).json({ message: "Message Retrived", data: Msg })
           
        } else {
            return res.status(400).json({ error: "Message not Retrived" })
        }
    }).sort({'timestamp': -1 })

}

// update seenStatus

const updateStats = async (req, res) => {
    message.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },

    ).then(() => {
        res.status(200).send({ status: "200", statusmsg: "status updated" });
    }).catch((err) => {
        console.error(err);
        res.status(500).send({ status: "500", statusmsg: "error with updating data" });

    })
}

const getUsersBySeenStatus = async (req, res) => {


    const {reciver, seenStatus } = req.body;

    // message.find().sort({'timestamp': -1 })

    message.find({ reciver: reciver , seenStatus:seenStatus }, (err, Msg) => {
        if (Msg) {
            

                return res.status(200).json({ message: "User Found", data: Msg })
           
        } else {
            return res.status(200).json({ message: "Users not found" })
        }
    }).sort({'timestamp': -1 })

}


module.exports = {
    postMesage,
    getMsgfillter,
    getbyDatebySennder,
    updateStats,
    getUsersBySeenStatus
}