const TypingStatus = require('../models/typingStatus')

/* Post message */

const postTypnigMesage = async (req, res) => {
    let newHistoryMessage = new TypingStatus(req.body);
    const { sennder, reciver, typingStatus } = req.body;

    TypingStatus.findOne({ sennder: sennder, reciver: reciver }, (err, data) => {

        if (!data) 
        {
            newHistoryMessage.save((err) => {
                if (err) {
                    return res.status(400).json({ Error: err });
                }
        
                return res.status(200).json({
                    success: "Message History data successfully inserted !",
                    status: "200"
                });
            });


        }else{

            const id = data.id
            

            TypingStatus.findByIdAndUpdate(id,
                {
                    typingStatus: typingStatus
                   

                },

            ).then((data) => {
                res.status(200).send({ status: "200", statusmsg: "user updated", data: data });
            }).catch((err) => {
                console.error(err);
                res.status(500).send({ status: "500", statusmsg: "error with updating data" });

            })
            
        }
        
    })

    


   
}

const getTypingStatus = async (req, res) => {
    const { sennder, reciver } = req.body;

    TypingStatus.findOne({ sennder: sennder, reciver: reciver }, (err, data) => {

        if (data) {


            return res.status(200).json({ message: "Alredy Have", data: data })

        } else {
            return res.status(400).json({ error: "No Data" })
        }
    })
}




const updateByTypnigMsg = async (req, res) => {
    const { sennder, reciver, typingStatus } = req.body;

    TypingStatus.findOne({ sennder: sennder, reciver: reciver }, (err, data) => {

        if (data) {

            const id = data.id
            

            TypingStatus.findByIdAndUpdate(id,
                {
                    typingStatus: typingStatus
                   

                },

            ).then((data) => {
                res.status(200).send({ status: "200", statusmsg: "user updated", data: data });
            }).catch((err) => {
                console.error(err);
                res.status(500).send({ status: "500", statusmsg: "error with updating data" });

            })

        }


    })
}

const getAllobjects = async (req, res) => {
    try {
        const Objectdata = await TypingStatus.find()
        return res.status(200).send({
            status: "200",
            data: Objectdata
        })
    } catch (err) {
        return res.status(500).send({
            status: "500",
            err: err
        })
    }
}



module.exports = {
    postTypnigMesage,
    getTypingStatus,
    updateByTypnigMsg,
    getAllobjects
}