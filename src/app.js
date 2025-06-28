const express = require('express');
const app = express();

// middleware
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json("Hello, Srushti!! From the server!")
})

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


app.listen(3000,()=>{
    console.log("Server is running on port 3000!")
})
