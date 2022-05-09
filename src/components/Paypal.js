import React, { useEffect, useRef, useState } from 'react'

const Paypal = (props) => {

    const paypal = useRef();

    const[name,setName] = useState(props.carData.name);
    const[price,setPrice] =useState(props.carData.price);


    
    
  return (
    <div ref={paypal}></div>
  )
}

export default Paypal;