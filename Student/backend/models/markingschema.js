const mongoose = require('mongoose')

const markingSchema = new mongoose.Schema({
    markingId:{
        type:String,
        required:true,
        trim:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    updatedDate:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    }
    
});


const marking = mongoose.model("Marking",markingSchema)
module.exports = marking