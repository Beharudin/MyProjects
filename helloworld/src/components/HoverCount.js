import React, { Component } from 'react'
import UpdatedComponent from './WithComp'

export class HoverCount extends Component {
  render() {
    return (
      <h1 onMouseOver={this.props.countHandler}>{this.props.name} Hovered {this.props.count} times</h1>
    )
  }
}

export default UpdatedComponent(HoverCount)
