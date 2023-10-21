import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {message} from 'antd' 
export default function Signup() {
    const navigate =useNavigate();
    const [credentials,setcredentials]=useState({name :"",gmail:"",password:"",location:""})
    const hs=async (e)=>{
     e.preventDefault();
     const response=await fetch("http://localhost:8000/api/creatuser",{
       method :'POST',
       headers : {
        'Content-Type' : 'application/json'
       },
       body : JSON.stringify({
        name :credentials.name,email :credentials.email,password :credentials.password,location:credentials.location
       })

     });
     const json= await response.json()
     console.log(json)
     if(!json.success){
        alert('Enter valid cradentials')
     }
     else{
      message.success('register sucessfully!');
        navigate('/login');
     }
    }
    const onc=(event)=>{
    setcredentials({...credentials,[event.target.name] : event.target.value})
    }
  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
    <div className='container'>
      <form className='w-50 m-auto  border bg-dark border-success rounded lll' onSubmit={hs}>
      <div className="m-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onc} />
   
  </div>
  <div className="m-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onc}  id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="m-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onc}  id="exampleInputPassword1"/>
  </div>
  <div className="m-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control" name='location' value={credentials.location} onChange={onc}  id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
</form>
</div>
    </div>
  )
}
