
const researchTopic = require('../models/researchTopics')



//get topics
const getTopics = async (req, res) => {
    researchTopic.find().exec((err, topics) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingTopics: topics
        });
    });
}

//Get SE Topics
const getSETopics = async (req, res) => {
    const field = 'SE';
    researchTopic.find({ researchField: field }).exec((err, topics) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingTopics: topics
        });
    });
}

//get IT Topics
const getITTopics = async (req, res) => {
    const field = 'IT';
    researchTopic.find({ researchField: field }).exec((err, topics) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingTopics: topics
        });
    });
}

//get CS Topivs
const getCSTopics = async (req, res) => {
    const field = 'CS';
    researchTopic.find({ researchField: field }).exec((err, topics) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingTopics: topics
        });
    });
}

//get CSNE Topivs
const getCSNETopics = async (req, res) => {
    const field = 'CSNE';
    researchTopic.find({ researchField: field }).exec((err, topics) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingTopics: topics
        });
    });
}



module.exports = {
    getTopics,
    getSETopics,
    getITTopics,
    getCSTopics,
    getCSNETopics
}