const express = require('express');
const app = express();
const  devUser = require("./src/model/user")
const connectDb = require("./src/config/database");
connectDb();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authUser = require("./src/middleware/userLogin");

// middleware
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.status(200).json("Hello, Srushti!! From the server!")
})
// sign up
app.post("/signup",async(req,res)=>{
    try{
        const {firstName, lastName, emailId, password, photoUrl,bio, skills } = req.body;

        if(!firstName || !lastName || !emailId || !password){
            res.status(400).json({error:"All fields are required"});
        }
      console.log(req.body);

      if(password.length >15 && password.length < 7){
        throw error("Max length of password is 15 and min length is 7.")
      }

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

// login
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

        res.cookie("token",token,{
           httpOnly: true,
           maxAge: 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            message: "Login successful!"
            // token
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

app.get("/profile",async(req,res)=>{
    try{

         const cookies = req.cookies;

        console.log(cookies)
        res.send("Reading cookies");

    }catch(err){
        res.status(500).json({message:"Internal Server Error",error:err.message});
    }
})

// get a user
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

// api level validation

const allowed_updates = [
    "photoUrl", "about","gender", "bio","skills"
]

const isUpdateAllowed = Object.keys(data).every((k)=>allowed_updates.includes(k));

if(!isUpdateAllowed){
    // res.status(400).json({message:"Update not allowed"})
    throw new Error("Update not allowed!");
}

if(data?.skills?.length > 10){
    throw error("Skills caannot be more than 10")
}


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
