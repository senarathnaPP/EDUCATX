const router = require("express").Router();
const registerTopic = require("../models/registerResearchTopic");

router.route("/registerTopic").post((req, res) => {
    const { groupName, researchField, researchTopic, supervisor } = req.body;
    let nnName = '';

    const newTopicReg = new registerTopic({
        groupName,
        researchField,
        researchTopic,
        supervisor
    });

    registerTopic.findOne({ groupName: groupName }).then((group) => {
        if (!(group)) {
            newTopicReg.save().then(() => {
                res.status(200).send({ status: "Student Group Updated", topicReg: newTopicReg });
            }).catch((error) => {
                console.log(error);
            })
        } else {
            res.send({ status: "Student Group Already exist" });
        }
    }).catch((err) => {
        console.log(err);
    })



})




// router.route("/registerTopic/:id").get((req, res) => {
//     let id = req.params.id;
//     registerTopic.findById(id).then((group) => {
//         res.json(group)
//     }).catch((error) => {
//         console.log(error)
//     })
// })

router.route("/registerTopic/:id").get((req, res) => {
    let id = req.params.id;
    registerTopic.findById(id).then((group) => {
        res.json(group)
    }).catch((error) => {
        console.log(error)
    })
})


router.route("/registerTopic").get((req, res) => {
    registerTopic.find().then((group) => {
        res.json(group)
    }).catch((error) => {
        console.log(error)
    })
})


// router.route("/update/:id").put((req, res) => {
//     let id = req.params.id;
//     const { groupName, groupLeaderName, groupLeaderId, memberTwoName, memberTwoId, memberThreeName, memberThreeId, memberFourName, memberFourId } = req.body;


//     const updateGroup = {
//         groupName,
//         groupLeaderName,
//         groupLeaderId,
//         memberTwoName,
//         memberTwoId,
//         memberThreeName,
//         memberThreeId,
//         memberFourName,
//         memberFourId
//     }

//     const update = Group.findByIdAndUpdate(id, updateGroup).then(() => {

//         res.status(200).send({ status: "Group Updated", updatedGroup: update });
//     }).catch((error) => {
//         res.status(500).send({ status: "error", error: error });
//     })
// })

// router.route("/delete/:id").delete((req, res) => {
//     const id = req.params.id;
//     Group.findByIdAndDelete(id).then(() => {
//         res.status(200).send({ status: "Student Deleted" });
//     }).catch((error) => {
//         console.log(error);
//     })
// })

module.exports = router;