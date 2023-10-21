const express = require('express')

const mongoose=require('mongoose')
const app = express()
const port = 8000

const mongoURI='mongodb+srv://anuragtandon54321:anu1122gamer@cluster0.htkbsue.mongodb.net/gofoodmern?retryWrites=true&w=majority'


 mongoose.set('strictQuery',false)
const connectDB=async()=>{
    try {
       await mongoose.connect(mongoURI,{
        useNewUrlParser :true,
        useUnifiedTopology :true,
       
       },
       
      ) 

      console.log('mongoDB is connected')
     
      
       
     
      
       
    } catch (error) {
        console.log('mongoDB is not connected')  
    }
}
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
})
app.use(express.json())
app.use('/api',require("./routes/CreatUser"))
app.use('/api',require("./routes/DisplayData"))
app.use('/api',require("./routes/OrderData"))
// app.use('/api',require("./routes/MyOrderData"))
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  connectDB();
  
  console.log(`Example app listening on port ${port}`)
})