const mongoose = require('mongoose')

const addTypingStatus = new mongoose.Schema({
    sennder:{
        type:String,
        required:true,
        trim:true
    },
    reciver:{
        type:String,
        required:true,
        trim:true
    },
    typingStatus:{
        type:String,
        required:false,
        trim:true
    }
    
    
});


const addMsgTyping = mongoose.model("MessageTypnig",addTypingStatus)
module.exports = addMsgTyping