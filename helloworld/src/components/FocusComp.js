import React, { Component } from 'react'
import InputFocus from './InputFocus'

class FocusComp extends Component {
    constructor(props) {
      super(props)
    
      this.parRef=React.createRef()
    }
    
    refHandler=()=>{
        this.parRef.current.inputFocus()
    }
  render() {
    return (
      <div>
        <InputFocus ref={this.parRef}/>
        <button onClick={this.refHandler}>Focus</button>
      </div>
    )
  }
}

export default FocusComp
