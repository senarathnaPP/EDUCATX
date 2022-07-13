const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')
// const joi = require('joi');
// const { string } = require('joi');
//const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    
});

// userSchema.methods.generateAuthToken = function(){
//     const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"})
//     return token
// };

const admin = mongoose.model("Admin",userSchema)

// const validate = (data) =>{
//     const schema = joi.object({
//         firstName:joi.string().required().label("First Name"),
//         lastName:joi.string().required().label("Last Name"),
//         email:joi.string().email().required().label("Email"),
//         password:passwordComplexity.required().label("Password")

//     })

//     return schema.validate(data);
// }

module.exports = admin