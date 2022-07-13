const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true,
        trim: true
    },
    cloudinary_id: {
        type: String,
        required: true,
        trim: true
    },

}, { timestamps: true });


const submission = mongoose.model("Submission", submissionSchema)
module.exports = submission