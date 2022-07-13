const marking = require('../models/markingschema');

/*create markings*/
const postMarkings = async(req,res)=>{
    let newMarking = new marking(req.body);

    newMarking.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"New Marking successfully added !"
        });
    });

}

//get markings
const getMarking =  async(req,res)=>{
    marking.find().exec((err,markings)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingMarkings:markings
        });
    });
}

//Get marking category A
const getMarkingcategoryA =  async(req,res)=>{
    marking.find({ "category": "A" }).exec((err,markings)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingMarkings:markings
        });
    });
}

//Get marking category B
const getMarkingcategoryB =  async(req,res)=>{
    marking.find({ "category": "B" }).exec((err,markings)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingMarkings:markings
        });
    });
}

//Get marking category C
const getMarkingcategoryC =  async(req,res)=>{
    marking.find({ "category": "C" }).exec((err,markings)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingMarkings:markings
        });
    });
}

//Get marking category D
const getMarkingcategoryD =  async(req,res)=>{
    marking.find({ "category": "D" }).exec((err,markings)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingMarkings:markings
        });
    });
}

//get a specific marking by id
const getAMarking=async(req,res)=>{
    let markingId = req.params.id;
    marking.findById(markingId,(err,marking)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            marking
        });
    });

}


//update marking details
const updateMarking = async(req,res)=>{
    marking.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Marking Scheme details updated successfully!"
            });
        }
    )
}

//delete  
const deleteMarking = async(req,res)=>{
    marking.findByIdAndRemove(req.params.id).exec((err,deletedMarking)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the Marking something is wrong!",deletedMarking
            });
        }
        return res.status(200).json({
            success:"MarkingScheme removed successfully!",deletedMarking
        });
    });
};

module.exports = {
    postMarkings,
    getMarking,
    getMarkingcategoryA,
    getMarkingcategoryB,
    getMarkingcategoryC,
    getMarkingcategoryD,
    getAMarking,
    updateMarking,
    deleteMarking
    // getMarkingCatA
}