const mongoose = require('mongoose')

const addMessageHistory = new mongoose.Schema({
    personOne:{
        type:String,
        required:true,
        trim:true
    },
    personTwo:{
        type:String,
        required:true,
        trim:true
    },
    groupNumber:{
        type:String,
        required:false,
        trim:true
    }
    
    
});


const addMsgHistory = mongoose.model("MessageHistory",addMessageHistory)
module.exports = addMsgHistory