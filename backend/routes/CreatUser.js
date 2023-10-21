const express=require('express')
const router=express.Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt =require("jsonwebtoken")
const bcrypt =require('bcryptjs')
const jwtSecret="12345asdfgzxcvbasdfgjkljhqwerjgf"
router.post("/creatuser",[
body('email','Invalid Email').isEmail(),
body('name').isLength({ min: 5 }),
// password must be at least 5 chars long
body('password','Passward will be of minimum 5 length').isLength({ min: 5 })]
,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt=await bcrypt.genSalt(10);
    let sp=await bcrypt.hash(req.body.password,salt)
  try {
  await User.create({
    name:req.body.name,
    password:sp,
    email:req.body.email,
    location:req.body.location
   
   }) 
   res.json({success :true});
} catch (error) {
    console.log(error);
    res.json({success :false});
}
})
router.post("/loginuser",[
  body('email','Invalid Email').isEmail(),
 
  body('password','Passward will be of minimum 5 length').isLength({ min: 5 })]
  ,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
     let email =req.body.email ;
    try {
   let ue = await User.findOne({email});
   if(!ue){
    return res.status(400).json({ errors: "Try login with correct credentials" });
   }
   const pcompare=await bcrypt.compare(req.body.password,ue.password);
   if(!pcompare){
    return res.status(400).json({ errors: "Try login with correct Password" });
   }
   const data={
    user:{
      id :ue.id

    }
  }
  const authToken=jwt.sign(data,jwtSecret);
   return res.json({ success :true,authToken : authToken});
   
    
  } catch (error) {
      console.log(error);
      res.json({success :false});
  }
  })
module.exports=router;
