const express = require('express');
const app = express();

// middleware
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json("Hello, Srushti!! From the server!")
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000!")
})
