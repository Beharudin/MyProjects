import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyCakes } from '../redux';

function HooksCakeContainer() {
    const noOfCakes=useSelector(state=>state.noOfCakes);
    const dispatch=useDispatch()
  return (
    <div style={{textAlign:"center", marginTop: '50px'}}>
      <h2>number of cakes: {noOfCakes}</h2>
      <button onClick={()=>dispatch(buyCakes())}>Buy Cake</button>
    </div>
  )
}

export default HooksCakeContainer
