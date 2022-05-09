import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import {
    useParams
  } from "react-router-dom";
import axios from 'axios';
import Navbar from '../components/common/navbar';

const Checkout = () => {
  const paypal = useRef();

  const navigate =useNavigate();


    let { id,name,price } = useParams();

    const [carData, setcarData] = useState([]);


    useEffect(() => {

      const users = localStorage.getItem('auth');
    
      

      axios.get(`http://localhost:8000/api/get-car/${id}`)
      .then(function (response) {
        // handle success
        console.log(response.data.data);
        setcarData(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


      
      window.paypal.Buttons({

        createOrder:(data,actions,err)=>{
            return actions.order.create({
                intent:"CAPTURE",
                purchase_units : [
                    {
                    description : name,
                    amount:{
                        currency_code : "USD",
                        value: price,
                    }
                    }
                ]
            })
        },
        onApprove:async (data,actions)=>{
            const order =await actions.order.capture();

            if(users){
              const data = JSON.parse(users);
              const userId =data.user.id;
              axios.get(`http://localhost:8000/api/update-car/${id}/${userId}/${order.id}`)
              .then(function (response) {
                // handle success
                console.log(response.data);
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })  
                 }
          
          

            navigate('/dashboard')

            console.log(order.id);
        },
        onError : (err) => {
            console.log(err);
        }

      }).render(paypal.current)
    
      
    }, [])

  

  return (
    <>
    <h1>Checkout Page</h1>
    <div className='container d-flex justify-content-center mt-5'>
    <div ref={paypal}></div>
    </div>
    </>
  )
}

export default Checkout;