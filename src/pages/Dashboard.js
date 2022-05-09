import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/navbar';
import Paypal from '../components/Paypal';

const Dashboard = () => {
    const navigate = useNavigate();
    const[cars,setCars]=useState([]);

    useEffect(() => {


        const users = localStorage.getItem('auth');
    
        if(users){
          const data = JSON.parse(users);
          if(data.token){
            navigate('/dashboard');
          }
          else{
            navigate('/');
          }
        
          console.log(data.token);
        }else{
          navigate('/');
    
        }
        
        
      }, [])


    const a = (data) =>{
      console.log(data);
      setCars(data);
    }

useEffect(() => {
  
  axios.get("http://localhost:8000/api/get-cars")
  .then(function (response) {
    setCars(response.data.data);   
     console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })


  
}, [])

  return (
     <>
      <Navbar callBack={a} from={"dashboard"}/>
    <div class="container mt-5">
  <div class="row">
    { cars.map((item)=>{
        return(
            <div class="col-3 mt-3 mb-3 ">
    <div class="card" >
    <img src={item.image}  class="rounded float-start" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{item.name}</h5>
    <h5 class="card-title">Price : {item.price}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Model no : {item.model}</h6>
    <Link to={`/checkout/${item.id}/${item.name}/${item.price}`}><button class="btn btn-primary" type="button">Buy Now</button></Link>
  </div>
</div>
    </div>
        );
    })
    }
    </div>
</div>
     </>
  )
}

export default Dashboard;
