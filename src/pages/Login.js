import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/navbar';

const Login = () => {

  const navigate = useNavigate();
  const[error,setError]=useState(false);
  const[errorMessage,setErrorMessage]=useState('');
  const[loader,setLoader]=useState(false);

const handleSubmit = (e) =>{
  e.preventDefault();

  setLoader(true);

  
  axios.post('http://localhost:8000/api/auth/login', {
    email: e.target.email.value,
    password:e.target.password.value,
  },{headers :{
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }})
  .then(function (response) {
    localStorage.setItem("auth",JSON.stringify(response.data.data));
    setLoader(false);
    navigate('/dashboard');
    console.log(response.data);
  })
  .catch(function (error) {
    setLoader(false);
    setError(true);
    setErrorMessage(error);
    setTimeout(() => {
      setError(false);
    }, 3000);
    console.log(error);
  });
}


  return (
    <>
        <Navbar/>
        {loader && <div style={{width: '100vw',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div class="spinner-border" style={{width: "3rem",height: "3rem"}} role="status">
  <span class="visually-hidden">Loading...</span>
</div>
        </div>}
<div style={{display: 'flex', justifyContent: 'center', padding: '100px 0'}}>
<div class="card" style={{width:'18rem', alignItems:'center',alignContent:'center'}}>
  <div class="card-body">
  <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" name='password' class="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" class="btn btn-primary">Login</button>
</form>
<hr/>
 <Link to={'/register'}><button  class="btn btn-primary">Register</button></Link>
  </div>
</div>
</div>
       
        
    </>
  )
}

export default Login;
