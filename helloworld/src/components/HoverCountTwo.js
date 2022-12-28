import React, { Component } from 'react'

class HoverCountTwo extends Component {
  render() {
    const {count, countHandler}=this.props
    return (
      <h1 onMouseOver={countHandler}>Hovered {count} times</h1>
    )
  }
}

export default HoverCountTwo
