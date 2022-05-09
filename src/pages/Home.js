import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../components/common/navbar';

const Home = () => {
   

    const[cars,setCars]=useState([]);

    const a = (data) =>{
      console.log(data);
      setCars(data);
    }

useEffect(() => {
  
  const getCars = async() => {
    const carsData = await axios.get("http://localhost:8000/api/get-cars");
    console.log(carsData.data.data);
    setCars(carsData.data.data);
  }

  getCars();
  
}, [])

  



  return (
      <>
    <Navbar callBack={a}/>
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
    <Link to={'/login'}><button class="btn btn-primary" type="button">Buy Now</button></Link>
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

export default Home;
