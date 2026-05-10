const mongoose =  require("mongoose");

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
        trim: true
    },
    DOB:{
        type: Number
    },
    age:{
        type: Number
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
        default:"https://images.unsplash.com/photo-1715596802669-fe644878f21b?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    bio:{
        type:String,
        default:"Hey, I'm new!! Let's Connect"
    },
    skills:{
        type:[String],
    }
},
{
    timestamps: true
}

);

// creating user model
module.exports = mongoose.model("User",devUserSchema);