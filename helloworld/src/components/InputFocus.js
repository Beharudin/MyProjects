import React, { Component } from 'react'

class InputFocus extends Component {
    constructor(props) {
      super(props)
      this.inpRef=React.createRef()
    }

    inputFocus(){
        this.inpRef.current.focus()
    }  
  render() {
    return (
      <div>
        <input type='text' ref={this.inpRef}/> 
      </div>
    )
  }
}

export default InputFocus
