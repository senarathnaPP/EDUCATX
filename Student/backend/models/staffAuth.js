const mongoose = require('mongoose');

const schema = mongoose.Schema;

const staffAuthSchema = new schema({

    MainStaffId: {
        type: String,
        required: true,
        trim: true
    },


    MainstfUserPassword: {
        type: String,
        required: true,
        trim: true

    },
  
    
},{timestamps:true})

const mainStaff = mongoose.model('MainStuff',staffAuthSchema);

module.exports = mainStaff;