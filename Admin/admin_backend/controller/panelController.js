const roles = require('../models/roles')
const panel = require('../models/panel')

//get roles
const getRoles =  async(req,res)=>{
    roles.find().exec((err,roles)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingRoles:roles
        });
    });
}


//get a specific role by id
const getASpecificRole=async(req,res)=>{
    let roleId = req.params.id;
    roles.findById(roleId,(err,role)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            role
        });
    });

}

//update role details
const updateRole = async(req,res)=>{
    roles.findByIdAndUpdate(
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
                success:"Role details updated successfully!"
            });
        }
    )
}

//delete Role from the system
const deleteRole = async(req,res)=>{
    roles.findByIdAndRemove(req.params.id).exec((err,deletedRole)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the Role something is wrong!",deletedRole
            });
        }
        return res.status(200).json({
            success:"Role removed successfully!",deletedRole
        });
    });
};


//Create panel
const createPanel = async(req,res)=>{
    let newPanel = new panel(req.body);

    newPanel.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"New Panel added to the system!"
        });
    });

}

//get panels
const getPanels =  async(req,res)=>{
    panel.find().exec((err,panels)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPanels:panels
        });
    });
}


//get a specific panel by id
const getASpecificPanel=async(req,res)=>{
    let panelId = req.params.id;
    panel.findById(panelId,(err,panel)=>{
        if(err){
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            panel
        });
    });

}

//update panel details
const updatePanel = async(req,res)=>{
    panel.findByIdAndUpdate(
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
                success:"Panel details updated successfully!"
            });
        }
    )
}

//delete panels from the system
const deletePanel = async(req,res)=>{
    panel.findByIdAndRemove(req.params.id).exec((err,deletedPanel)=>{
        if(err){
            return res.status(400).json({
                message:"Couldn't delete the Panel something is wrong!",deletedPanel
            });
        }
        return res.status(200).json({
            success:"Panel removed successfully!",deletedPanel
        });
    });
};

module.exports = {
    getRoles,
    getASpecificRole,
    updateRole,
    deleteRole,
    createPanel,
    getASpecificPanel,
    updatePanel,
    deletePanel,
    createPanel,
    getPanels
}