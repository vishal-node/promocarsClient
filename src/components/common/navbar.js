import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {

  const[name,setName]=useState('');
  const[search,setSearch]=useState('');



const navigate = useNavigate();
  useEffect(() => {

    const users = localStorage.getItem('auth');
    

    if(users){
      const data = JSON.parse(users);
      if(data.token){
        setName(data.user.name);
        navigate('/dashboard');
      }
      else{
        navigate('/');
      }
    
      console.log(data.token);
    }
    
    
  }, [])
  

    const sendTo = (e) =>{
      console.log(e.target.value);

      setSearch(e.target.value);

      axios.get(`http://localhost:8000/api/search-cars/${e.target.value}`)
  .then(function (response) {
    // handle success

    props.callBack(response.data.data);

    console.log(response.data.data);
  })
  .catch(function (error) {
    axios.get(`http://localhost:8000/api/get-cars`)
    .then(function (response) {
      // handle success
  
      props.callBack(response.data.data);
  
      console.log(response.data.data);
    }) 
       console.log(error);
  })
    }

    const logout = () => {
      localStorage.removeItem('auth');
      navigate('/login');
    }

return (
<nav className="navbar navbar-light bg-light">
  <div className="container-fluid">
    <Link to={'/'} className="navbar-brand">PromoCars</Link>
    
   
    <div style={{width: '400px'}} className="d-lg-flex p-2 bd-highlight">
      <input className="form-control me-2" onChange={(e) =>sendTo(e)} value={search} type="search" placeholder="Search Car" aria-label="Search"/>
      <button className="btn btn-outline-success" >Search</button>
    </div>
    
      
    {props.from && props.from == "dashboard" ?<div>
    <span style={{marginRight: '20px'}}>Hi, {name && name}</span>
    <button type="button" onClick={logout} class="btn btn-primary">Logout</button>    
   </div>
    :<div>
    <Link to={'/login'}><button type="button" style={{marginRight: '20px'}} class="btn btn-outline-primary">Login</button></Link>
    <Link to={'/register'}><button type="button" class="btn btn-primary">Register</button></Link>
    </div>
    }

     </div>
     
    </nav>

    )
}

export default Navbar;
