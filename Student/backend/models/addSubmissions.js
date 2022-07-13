const mongoose = require('mongoose')

const addSubmissionSchema = new mongoose.Schema({
    groupId: {
        type: String,
        required: true,
        trim: true
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    researchField: {
        type: String,
        required: true,
        trim: true
    },
    supervisorName: {
        type: String,
        required: true,
        trim: true
    }

});


const addSubmission = mongoose.model("Research", addSubmissionSchema)
module.exports = addSubmission