import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate();
  return (
    <>
        <div>Home Page </div>
        <button onClick={()=>{navigate('order_summary')}}>Place order</button>
    </>
  )
}

export default Home
