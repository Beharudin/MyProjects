const mongoose = require("mongoose");

mongoUrl='mongodb+srv://bahar:1234@cluster0.uehsvmc.mongodb.net/camunda';
mongoose.connect(mongoUrl, {useNewUrlParser:true});

var conn=mongoose.connection;

conn.on('error', ()=>{
    console.log("MDb Connection failed")
})

conn.on('connected', ()=>{
    console.log("MDb Connected successfully")
})

module.exports=mongoose