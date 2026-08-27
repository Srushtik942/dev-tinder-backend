const mongoose =  require("mongoose");
const validator = require("validator");

// creating userSchema
const devUserSchema = new mongoose.Schema({
    firstName:{
       type: String,
       required: true,
       minLength: 4,
       maxLength: 20
    },
    lastName:{
        type:String,
        required: true
    },
    emailId:{
        type: String,
        lowercase:true,
        required:true,
        unique:true,
        trim: true,
        validate(value){
         if(!validator.isEmail(value)){
            throw new error("Invalid email address" + value);
         }
        }
    },
    DOB:{
        type: Number,
    },
    age:{
        type: Number,
        min: 18
    },
    gender:{
        type: String,

    },
    password:{
        type: String,
        required:true
    },
    photoUrl:{
        type:String,
        default:"https://images.unsplash.com/photo-1715596802669-fe644878f21b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        validate(value){
           if(!validator.isURL(value)){
            throw new error("Invalid photo url",+ value);
           }
        }

    },
    bio:{
        type:String,
        default:"Hey, I'm new!! Let's Connect",
        minLength:10,
        maxLength:30

    },
    skills:{
        type:[String]
    }
},
{
    timestamps: true
}

);

// creating user model
module.exports = mongoose.model("DevUser",devUserSchema);