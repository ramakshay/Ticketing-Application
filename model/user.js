const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        min : 5
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        max : 255
    },
    password : {
        type : String,
        required : true,
        max : 1024,
        min : 6
    },
    address : {
        street : {
            type : String,
            required : true
        },
        pincode : {
            type : String,
            max : 6,
            required : true
        },
    },
    phone : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('User',userSchema);