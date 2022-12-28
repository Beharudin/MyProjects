import React, { Component } from 'react'

class Form extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         username: '',
         language: 'React'
      }
    }
    usernameHandler=(e)=>{
        this.setState({
            username: e.target.value
        })
    }
    languageHandler=(e)=>{
        this.setState({
            language: e.target.value
        })
    }
    submitHandler=event=>{
        alert(this.state.username+' likes '+this.state.language)
    }

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <label>Username: </label>
        <input type="text" value={this.state.username} onChange={this.usernameHandler}/>
        <select value={this.state.language} onChange={this.languageHandler}>
            <option value='React'>React</option>
            <option value='Java'>Java</option>
            <option value='Python'>Python</option>
            <option value='PHP'>PHP</option>
            <option value='C++'>C++</option>
        </select>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

export default Form
