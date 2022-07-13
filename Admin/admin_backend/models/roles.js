const mongoose = require('mongoose');

const schema = mongoose.Schema;

const staffSchema = new schema({

    stfStaffId: {
        type: String,
        required: true,
        trim: true

    },
    stfName: {
        type: String,
        required: true,
        trim: true

    },
    stfEmail: {
        type: String,
        required: true,
        trim: true

    },
    stfPhonenNmber: {
        type: String,
        required: true,
        trim: true

    },
    stfJobRole: {
        type: String,
        required: true,
        trim: true

    },
    stfPanellMember: {
        type: String,
        required: true,
        trim: true

    },
    
    stfResField: {
        type: String,
        required: true,
        trim: true

    },
    stfUserActive: {
        type: String,
        required: true,
        trim: true

    },
    stfUserPassword: {
        type: String,
        required: true,
        trim: true

    },
    stfUserQ1: {
        type: String,
        required: true,
        trim: true

    },
    stfUserQ2: {
        type: String,
        required: true,
        trim: true

    },

   
    
},{timestamps:true})

const staffRegistration = mongoose.model('Staff',staffSchema);

module.exports = staffRegistration;