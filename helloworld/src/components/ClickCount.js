import React, { Component } from 'react'
import UpdatedComponent from './WithComp'

class ClickCount extends Component {
  render() {
    return (
      <button onClick={this.props.countHandler}>{this.props.name} Clicked {this.props.count} times</button>
    )
  }
}

export default UpdatedComponent(ClickCount)

