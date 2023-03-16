import React from 'react'
import { connect } from 'react-redux'
import { buyCakes } from '../redux'

function CakeContainer(props) {
  return (
    <div style={{textAlign:"center"}}>
      <h2>number of cakes: {props.noOfCakes}</h2>
      <button onClick={props.buyCakes}>Buy Cake</button>
    </div>
  )
}

const stateToProps=state=>{
    return{
        noOfCakes: state.noOfCakes
    }
}

const dispatchToProps=dispatch=>{
    return{
        buyCakes: ()=>dispatch(buyCakes())
    }
}

export default connect(stateToProps, dispatchToProps) (CakeContainer)
