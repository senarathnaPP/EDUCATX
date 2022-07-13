const eveluation = require("../models/supEveluation");


//add evaluation
const postEvaluation = async(req,res)=>{
    let newEvaluation = new eveluation(req.body);

    newEvaluation.save((err)=>{
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

//get markings
const getEveluation =  async(req,res)=>{
    eveluation.find().exec((err,eveluations)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingEveluation:eveluations
        });
    });
}

module.exports = {
    postEvaluation,
    getEveluation
}