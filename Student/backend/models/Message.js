const mongoose = require('mongoose');

const schema = mongoose.Schema;

const messageSchema = new schema({

    staffId: {
        type: String,
        required: true,
        trim: true

    },

    studentId: {
        type: String,
        required: true,
        trim: true

    },
    sennder: {
        type: String,
        required: true,
        trim: true
    },
    reciver: {
        type: String,
        required: true,
        trim: true
    },

    msg: {
        type: String,
        required: true,
        trim: true
    },
    seenStatus: {
        type: String,
        required: true,
        trim: true
    },

    
},{timestamps:true})

const Msg = mongoose.model('Message',messageSchema);

module.exports = Msg;