const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    uname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
  
    image:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    region:{
        type:String,
    },
    specialization:{
        type:String,
    },
    country:{
        type:String,
    },
    approved:{
        type:Boolean,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
   
},{timestamps:true})

const User=mongoose.model('User',userSchema)
module.exports=User