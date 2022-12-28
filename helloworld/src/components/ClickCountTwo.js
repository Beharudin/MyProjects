import React, { Component } from 'react'

class ClickCountTwo extends Component {
  render() {
    const {count, countHandler}=this.props
    return (
      <button onClick={countHandler}> Clicked {count} times</button>
    )
  }
}

export default ClickCountTwo

