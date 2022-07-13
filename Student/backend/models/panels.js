const mongoose = require('mongoose');

const schema = mongoose.Schema;


const panelSchema = new schema({

    panelId: {
        type: String,
        required: true,
        trim: true

    },
    studentGroup: {
        type: String,
        trim: true,
        required:true
    },
    memberName: [
        {
            memberName: {
             type: String,
             required: true
            }
         }
 
 ],
    
    // topicEvaluation: {
    //     type: String,
    //     required: true,
    //     trim: true

    // },
    // documentEvaluation: {
    //     type: String,
    //     required: true,
    //     trim: true

    // },
    // presentationEvaluation: {
    //     type: String,
    //     required: true,
    //     trim: true

    // },
    
    // thesisEvaluation: {
    //     type: String,
    //     required: true,
    //     trim: true

    // },
    
   
    
},{timestamps:true})

const panel = mongoose.model('Panels',panelSchema);

module.exports = panel;