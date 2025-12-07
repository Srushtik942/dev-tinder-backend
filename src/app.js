const express = require('express');
const app = express();
const  User = require("./model/user")
const connectDb = require("./config/database");
connectDb();
const bcrypt = require("bcrypt");

// middleware
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json("Hello, Srushti!! From the server!")
})

app.post("/signup",async(req,res)=>{
    try{
        const {firstName, lastName, emailId, password, photoUrl,bio, skills } = req.body;

        if(!firstName || !lastName || !emailId || !password){
            res.status(400).json({error:"All fields are required"});
        }
      console.log(req.body);

      const existingUser = await User.findOne({emailId: emailId});

      if(existingUser){
        res.status(404).json({error:"User already exists"});
      }

    const hasedPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            emailId,
            password:hasedPass,
            photoUrl,
            bio,
            skills
        })
        await newUser.save();
        res.status(200).json({message:"User successfully registerd!",newUser})


    }catch(error){
        res.status(500).json({messsage:"Internal Server Error",error:error.message});
    }
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000!")
})
