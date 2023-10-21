const mongoose =require('mongoose')
const mongoURI='mongodb+srv://anuragtandon54321:anu1122gamer@cluster0.htkbsue.mongodb.net/?retryWrites=true&w=majority'
const mongoDB=async()=>{
   await mongoose.connect(mongoURI,{useNewUrlParser : true},()=>{
        console.log("Connected sucessfully")
        });
}
module.exports=mongoDB;