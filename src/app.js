const express = require('express');
const app = express();
const UserLogin = require('UserLogin');

// middleware
app.use(express.json())

app.get('/',(req,res,next)=>{
    // res.status(200).json("Hello, Srushti!! From the server!")
     next();
},
(req,res,next)=>{
    console.log("HIII,,new One!!");
    res.status(200).json("Hii Srushtii!! welcome to new api")
}

)

app.get("/admin/getAllData",(req,res)=>{
    const token = req.query.token;
    const isAdminAuth = token === 'xyz';

    if(isAdminAuth){
        res.status(200).json("All Data Sent!")
    }
    else{
        res.status(404).json("Unauthorized data!")
    }

})


app.get('/user/login',UserLogin)

app.get('/hello/2',(req,res)=>{
    res.status(200).json("Abra ka Dabra!")
})

app.post('/user',(req,res)=>{
    console.log("Save data to the DB");
    res.status(200).json("Saved data to db!")
})

app.delete('/user',(req,res)=>{
    console.log("Deleted User Successfully!");
    res.status(200).json("Delete")
})

app.get('/home',(req,res)=>{
    console.log("You are in Home Page now!");
    res.status(200).json("Home Page");
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000!")
})
