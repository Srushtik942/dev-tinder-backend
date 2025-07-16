const mongoose = require("mongoose");

const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://19003040:ZGHYItiZJtejqob9@mybackend.gocm2.mongodb.net/devTinder");
}
module.exports = connectDb;

