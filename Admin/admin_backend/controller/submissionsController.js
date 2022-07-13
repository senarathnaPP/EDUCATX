const submission = require('../models/submissions')
const researchTopic = require('../models/researchTopics')

/*create submissions*/
const postSubmissions = async (req, res) => {
    let newSubmission = new submission(req.body);

    newSubmission.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "New Submission successfully added to the system!"
        });
    });

}

//get subs
const getSubmission = async (req, res) => {
    submission.find().exec((err, submissions) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: true,
            existingSubmissions: submissions
        });
    });
}

//get a specific sub by id
const getASpecificSubmission = async (req, res) => {
    let submissionId = req.params.id;
    submission.findById(submissionId, (err, submission) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            submission
        });
    });

}

//update sub details
const updateSubmission = async (req, res) => {
    submission.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: "Submission details updated successfully!"
            });
        }
    )
}

//delete subs from the system
const deleteSubmission = async (req, res) => {
    submission.findByIdAndRemove(req.params.id).exec((err, deletedSubmission) => {
        if (err) {
            return res.status(400).json({
                message: "Couldn't delete the Submission something is wrong!", deletedSubmission
            });
        }
        return res.status(200).json({
            success: "Submission removed successfully!", deletedSubmission
        });
    });
};


/*create topics*/
const postResearchTopics = async (req, res) => {
    let newTopicSubmission = new researchTopic(req.body);

    newTopicSubmission.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "New Research topic successfully added to the system!"
        });
    });

}

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

//get a specific topic by id
const getASpecificTopic = async (req, res) => {
    let topicId = req.params.id;
    researchTopic.findById(topicId, (err, researchTopic) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            researchTopic
        });
    });

}

//update topic details
const updateTopics = async (req, res) => {
    researchTopic.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: "Topic details updated successfully!"
            });
        }
    )
}

//delete topic from the system
const deleteTopic = async (req, res) => {
    researchTopic.findByIdAndRemove(req.params.id).exec((err, deletedTopic) => {
        if (err) {
            return res.status(400).json({
                message: "Couldn't delete the topic something is wrong!", deletedTopic
            });
        }
        return res.status(200).json({
            success: "Topic removed successfully!", deletedTopic
        });
    });
};

module.exports = {
    postSubmissions,
    getSubmission,
    getASpecificSubmission,
    updateSubmission,
    deleteSubmission,
    postResearchTopics,
    getTopics,
    updateTopics,
    deleteTopic,
    getASpecificTopic,
    getSETopics,
    getITTopics,
    getCSTopics,
    getCSNETopics
}