const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketId : {
        type : String,
        required : true,
        min : 5
    },
    ticketName : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
        max : 255
    },
    status : {
        type : String,
        required : true,
        max : 1024,
        min : 6
    }
})

module.exports = mongoose.model('Ticket',ticketSchema);