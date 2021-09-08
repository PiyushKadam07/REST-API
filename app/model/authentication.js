const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    'email' : {
        type : String,
        required : [true, "Email is required"]
    },
    'password' : {
        type : String,
        required : [true, "Password is required"]
    },
}, {  
    'timestamps' : true
})

module.exports = mongoose.model('Auth', authSchema);