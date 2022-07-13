const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    submissionId:{
        type:String,
        required:true,
        trim:true
    },
    topic:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String,
        required:true,
        trim:true
    },
    dueDate:{
        type:String,
        required:true,
        trim:true
    },
    dueTime:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    }
    
});


const submission = mongoose.model("SubmissionTypes",submissionSchema)
module.exports = submission