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



connectDb().then(()=>{
    console.log("Connection established sccessfully!");
    app.listen(3000,()=>{
    console.log("Server is running on port 3000!")
})

}).catch((error)=>{
    console.log("Coudn't established the connection!",error)
});


