const mongoose = require('mongoose')

const eveluation = new mongoose.Schema({
    markingschemaTit:{
        type:String,
        required:true,
        trim:true
    },
    markingschemaDis:{
        type:String,
        required:true,
        trim:true
    },
    groupName:{
        type:String,
        required:true,
        trim:true
    },
    memeberName:{
        type:String,
        required:true,
        trim:true
    },
    totalMarks:{
        type:String ,
        required:true,
        trim:true
    },
    submission:[
        
    {avatar:{
        type:String,
        required:true,
        trim:true}
    }],
    supervisor:{

        
        type:String,
        required:true,
        trim:true
    }
    
});


const Evaluation = mongoose.model("eveluation",eveluation)
module.exports = Evaluation