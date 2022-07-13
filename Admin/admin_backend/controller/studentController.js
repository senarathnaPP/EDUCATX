const Group = require('../models/studentGroup')
const assignGroup = require('../models/assignStudentGroup')


//get Groups
const getGroups =  async(req,res)=>{
    Group.find().exec((err,groups)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingGroups:groups
        });
    });
}

//create groups
const postGroups = async(req,res)=>{
    let newGroup = new assignGroup(req.body);

    newGroup.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Group assigned successfully!"
        });
    });

}

//get Group
const getAssignedGroup =  async(req,res)=>{
    assignGroup.find().exec((err,group)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingAssignedGroup:group
        });
    });
}

//get a specific group by id
const getASpecificGroup=async(req,res)=>{
    let groupName = req.params.id;
    Group.findById(groupName,(err,Group)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            Group
        });
    });

}
module.exports = {
    getGroups,
    postGroups,
    getAssignedGroup,
    getASpecificGroup
}