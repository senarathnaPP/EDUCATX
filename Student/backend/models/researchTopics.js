const mongoose = require('mongoose')

const ResearchTopicSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
        trim: true
    },

    researchField: {
        type: String,
        required: true,
        trim: true
    }

});


const topicSubmission = mongoose.model("researchTopics", ResearchTopicSchema)
module.exports = topicSubmission