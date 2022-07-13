const express= require('express')
const router = express.Router()
const {admin} = require('../models/adminModel');
const joi = require("joi")
const bcrypt = require('bcrypt')

router.post("/login",async(req,res)=>{
    try{
        const{error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message});
        const user = await admin.findOne({email:req.body.email});

        if(!user)
            return res.status(401).send({message:"Invalid Email or Password"})

        const validPassword = await bcrypt.compare(
            req.body.password,admin.password
        );

        if(!validPassword)
            return res.status(401).send({message:"Invalid Email or Password"})
        
        const token = admin.generateAuthToken();
        res.status(200).send({data:token,message:"Login Successful"})
    }catch(error){
        res.status(500).send({message:"Internal server error"})
    }
})

const validate = (data) =>{
    const schema = joi.object({
        email:joi.string().email().required().label("Email"),
        password:joi.string().required().label("Password")
    });

    return schema.validate(data);
}

module.exports = router;