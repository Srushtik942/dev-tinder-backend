const mongoose = require("mongoose");
require('dotenv').config()


const connectDb = async()=>{
    await mongoose.connect(process.env.MONGODB_URI).then(console.log("DB connected successfully!")).catch((error)=>error.message);
}
module.exports = connectDb;

