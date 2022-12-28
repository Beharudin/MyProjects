import React from 'react'

function ChildComponent(props) {
  return (
    <div>
      <button onClick={props.greetparent}>Greet Parent</button>
    </div>
  )
}

export default ChildComponent
