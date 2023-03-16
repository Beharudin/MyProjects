import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCakes1 } from '../redux';

function CakeContainer1() {
    const noOfCakes=useSelector(state=>state.noOfCakes);
    const [number, setNumber]=useState();
    const dispatch=useDispatch()
  return (
    <div style={{textAlign:"center", marginTop: '50px'}}>
      <h2>number of cakes: {noOfCakes}</h2>
      <input type="text" value={number} onChange={(e)=>setNumber(e.target.value)}/>
      <button onClick={()=>dispatch(buyCakes1(number))}>Buy {number} Cake</button>
    </div>
  )
}

export default CakeContainer1
