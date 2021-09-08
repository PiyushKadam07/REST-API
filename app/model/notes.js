const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    'title' : {
        type : String,
        required :  [true, "Title required"]
    },
    'description' : {
        type : String,
        required :  [true, "description required"]
    },
    'color' : {
        type : String,
        required :  [true, "color required"]
    },
    'isArchived' : {
        type : Boolean,
        default : false,
    },
    'isDeleted' : {
        type : Boolean,
        default : false,
    },
}, {  
    'timestamps' : true
})

module.exports = mongoose.model("Notes", noteSchema);