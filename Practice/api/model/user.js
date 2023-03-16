const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
}, {timestamps: true});

const userModel=mongoose.model('users', userSchema);

module.exports=userModel