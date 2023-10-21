import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {message} from 'antd'
import { Link } from 'react-router-dom';
export default function Login() {
  const navigate =useNavigate();
  const [credentials,setcredentials]=useState({email:"",password:""})
  const hs=async (e)=>{
   e.preventDefault();
   const response=await fetch("http://localhost:8000/api/loginuser",{
     method :'POST',
     headers : {
      'Content-Type' : 'application/json'
     },
     body : JSON.stringify({
      email :credentials.email,password :credentials.password
     })

   });
   const json= await response.json()
   console.log(json)
   if(!json.success){
      alert('Enter valid cradentials')
   }
   else{
    message.success('login sucessfully!');
    localStorage.setItem("userEmail",credentials.email)
    localStorage.setItem("authToken",json.authToken)
    console.log(localStorage.getItem("authToken"))
       navigate('/');
   }
  }
  const onc=(event)=>{
  setcredentials({...credentials,[event.target.name] : event.target.value})
  }
  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
       <div  className='container '>
      <form className='w-50 m-auto llll  border bg-dark border-success rounded' onSubmit={hs}>
    
  <div className="m-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onc}  id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="m-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onc}  id="exampleInputPassword1"/>
  </div>
 
 
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to='/creatuser' className='m-3 btn btn-danger'>Not a User! Register Here</Link>
</form>
</div>
    </div>
  )
}
