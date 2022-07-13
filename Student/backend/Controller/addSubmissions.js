const addSubmission = require('../models/addSubmissions')

//create addSubmission
const postSubmission = async(req,res)=>{
    let newSubmission = new addSubmission(req.body);

    newSubmission.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Thanks for the response!"
        });
    });

}

module.exports = postSubmission