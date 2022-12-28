import React, { Component } from 'react'
import ChildComponent from './ChildComponent'

class parentComponent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         parentName: "Parent"
      }

      this.GreetParent=this.GreetParent.bind(this)
    }

    GreetParent(){
        alert("Hello "+ this.state.parentName)
    }
    
  render() {
    return (
      <div>
        <ChildComponent greetparent={this.GreetParent}/>
      </div>
    )
  }
}

export default parentComponent
