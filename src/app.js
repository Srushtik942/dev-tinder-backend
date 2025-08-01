const express = require('express');
const app = express();
const connectDb = require("./config/database");
const User = require("./model/user");

// middleware
app.use(express.json())


app.post("/signup",async(req,res)=>{
    try{
        const {firstName, lastName, emailId, password} = req.body;
        console.log(req.body);

        if(!emailId || !password){
            return res.status(400).json({message:"Check your request body again!"})
        }

        const newUser = await User.create({firstName,lastName, emailId, password})

        return res.status(200).json({message:"User created successfully!", newUser});

    }catch(error){
        return res.status(500).json({message:"Internal Server Error!",error});
    }
})

// get user by mail
app.get('/user',async(req,res)=>{
 const UserEmail = req.body.emailId;
    try{
        const user = await User.findOne({emailId: UserEmail});

        if(!user){
            return res.status(404).json("USer not found!");
        }

       return res.status(200).json({message:"User has been fetched successfully!", user});

    }catch(error){
        return res.status(500).json({message:"Internal Server Error", error:error.message});
    }
})


app.get('/feed',async(req,res)=>{
    try{
        const UserData = await User.find({});

        if(UserData.length === 0){
            return res.status(404).json("No users found!")
        }

        return res.status(200).json({UserData});
    }catch(error){
        return res.status(500).json({message: "Internal Server Error", error: error.message});
    }
})

// delete user

app.delete("/user",async(req,res)=>{
    const userId = req.body.userId;
    try{
        const UserData = await User.findByIdAndDelete(userId);

        return res.status(200).json("User Deleted successfully!");

    }catch(error){
        return res.status(500).json({message:"Internal Server Error", error: error.message});
    }
})

// update user

app.put('/user',async(req,res)=>{
    const userId = req.bodyuserId;
    const data = req.body;
    try{
   await User.findByIdAndUpdate(userId, data,{new:true});
  res.status(200).json({message:"User updated successfully!",data})
    }catch(error){
        return res.status(500).json({message:"Internal Server Error", error: error.message});
    }
})


connectDb().then(()=>{
    console.log("Connection established sccessfully!");
    app.listen(3000,()=>{
    console.log("Server is running on port 3000!")
})

}).catch((error)=>{
    console.log("Coudn't established the connection!",error)
});


