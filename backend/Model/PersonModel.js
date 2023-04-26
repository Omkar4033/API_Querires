const mongoose=require('mongoose');

const personSchema=mongoose.Schema({

    id:{type:Number,required:true},
    first_name:{type:String,required:false},
    last_name:{type:String,required:false},
    email:{type:String,required:false},
    gender:{type:String,required:false},
    income:{type:String,required:false},
    city:{type:String,required:false},
    car:{type:String,required:false},
    quote:{type:String,required:false},
    phone_price:{type:Number,required:false}

})

const personModel=mongoose.model("person",personSchema);
module.exports={personModel};