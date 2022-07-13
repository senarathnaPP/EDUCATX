const mongoose = require('mongoose');


const assignGroupSchema = new mongoose.Schema({
    groupId: {
        type: String,
        required: true
    },
    
});

const assignGroup = mongoose.model("AssignedGroup", assignGroupSchema);

module.exports = assignGroup;