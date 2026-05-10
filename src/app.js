const express = require('express');
const app = express();
const  devUser = require("./model/user")
const connectDb = require("./config/database");
connectDb();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authUser = require("./middleware/userLogin");

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

      const existingUser = await devUser.findOne({emailId: emailId});

      if(existingUser){
        res.status(404).json({error:"User already exists"});
      }

    const hasedPass = await bcrypt.hash(password, 10);

        const newUser = new devUser({
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

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            return res.status(400).json({
                error: "All fields are required!"
            });
        }

        const userData = await devUser.findOne({ emailId });

        if (!userData) {
            return res.status(404).json({
                error: "User not found!"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            userData.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { _id: userData._id },
            "SECRET_KEY",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful!",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

app.get("/userProfile", authUser, async(req,res)=>{
    try{
        const emailId = req.query.emailId;
        const userData = await devUser.findOne({emailId:emailId});
        console.log("userData",userData);
        if(!userData){
            res.status(404).json({message:"User data not found!"})
        }
        res.status(200).json({message:"User data fetched successfully!",userData})

    }catch(error){
        res.status(500).json({mesage:"Unable to fetch the data",error:error.message});
    }
});

//update profile

app.patch("/updateProfile/:userId", authUser, async(req,res)=>{
try{
const userId = req.params.userId;
const data = req.body;

const updatedProfile = await devUser.findByIdAndUpdate(userId,data,{new:true});
console.log("updatedProfile",updatedProfile);

res.status(200).json({message:"Profile updated successfully!",updatedProfile})

if(!updatedProfile){
    res.status(404).json({message:"User not found!"})
}

}catch(err){
    res.status(500).json({message:"Unable to update the profile",error:err.message})
}
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000!")
})
