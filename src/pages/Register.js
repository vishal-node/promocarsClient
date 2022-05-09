import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/navbar';

const Register = () => {

  const navigate = useNavigate();
  const[error,setError]=useState(false);
  const[errorMessage,setErrorMessage]=useState('');
  const[loader,setLoader]=useState(false);

const handleSubmit = (e) =>{
  e.preventDefault();
  setLoader(true);

  const password = e.target.o_password.value;
  const c_password = e.target.password_confirmation.value
  console.log(password);
  console.log(c_password);

  if(password!=c_password){
    setError(true);
    setErrorMessage('Password does not match');
    setTimeout(() => {
      setError(false);
    }, 3000);
    return false;
  }

  axios.post('http://localhost:8000/api/auth/register', {
    name: e.target.name.value,
    email: e.target.email.value,
    password:e.target.password.value,
    password_confirmation:e.target.password_confirmation.value,
  },{headers :{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }})
  .then(function (response) {
    setLoader(false);
    navigate('/login');
    console.log(response);
  })
  .catch(function (error) {
    setLoader(false);
    console.log(error);
  });

}



  return (
    <>
    <Navbar/>
    {loader &&
      <div style={{width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <div class="spinner-border" style={{width: "3rem",height: "3rem"}} role="status">
  <span class="visually-hidden">Loading...</span>
</div>
</div>}
<div style={{display: 'flex', justifyContent: 'center', padding: '100px 0'}}>
<div class="card" style={{width:'18rem', alignItems:'center',alignContent:'center'}}>
   { error &&<div class="alert alert-danger" role="alert">
  {errorMessage}
</div>}
<div class="card-body">
<form onSubmit={handleSubmit}>
<div class="mb-3">
<label for="name" class="form-label">Name</label>
<input type="text" class="form-control" id="name" name='name' required/>
<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
</div>
<div class="mb-3">
<label for="exampleInputEmail1" class="form-label">Email address</label>
<input type="email" class="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp"/>
<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
</div>
<div class="mb-3">
<label for="exampleInputPassword1" class="form-label">Password</label>
<input type="password" name='o_password' class="form-control" id="exampleInputPassword1"/>
</div>
<div class="mb-3">
<label for="password" class="form-label">Confirm Password</label>
<input type="password" name='password_confirmation' class="form-control" id="password"/>
</div>
<button type="submit" class="btn btn-primary">Register</button>
</form>
<hr/>
<span>Already Registered ? </span>
<Link to={'/login'}><button  class="btn btn-primary">Login</button></Link>
</div>
</div>
</div>
 
    
</>  )
}

export default Register;
