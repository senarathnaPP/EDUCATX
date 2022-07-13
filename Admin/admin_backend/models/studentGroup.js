const mongoose = require('mongoose');


const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    groupLeaderName: {
        type: String,
        required: true
    },
    groupLeaderId: {
        type: String,
        required: true
    },
    memberTwoName: {
        type: String,
        required: true
    },
    memberTwoId: {
        type: String,
        required: true
    },
    memberThreeName: {
        type: String,
        required: true
    },
    memberThreeId: {
        type: String,
        required: true
    },
    memberFourName: {
        type: String,
        required: true
    },
    memberFourId: {
        type: String,
        required: true
    },
});

const Group = mongoose.model("group", groupSchema);

module.exports = Group;