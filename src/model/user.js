const mongoose =  require("mongoose");

// creating userSchema
const userSchema = new mongoose.Schema({
    firstName:{
       type: String,
    },
    lastName:{
        type:String
    },
    emailId:{
        type: String
    },
    DOB:{
        type: Number
    },
    age:{
        type: Number
    },
    gender:{
        type: String
    },
    password:{
        type: String
    }
});

// creating user model
module.exports = mongoose.model("User",userSchema);