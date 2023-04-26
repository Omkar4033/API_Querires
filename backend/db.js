const mongoose=require('mongoose');
require('dotenv').config();
const connection=mongoose.connect("mongodb://localhost:27017/person_details").then(()=>{
    console.log("connected to peson details")
}).catch((e)=>{
    console.log(e);
});

module.exports={connection}