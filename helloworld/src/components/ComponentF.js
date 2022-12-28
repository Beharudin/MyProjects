import React, { Component } from 'react'
import { ContextConsumer } from './UserContext'

class ComponentF extends Component {
  render() {
    return (
      <ContextConsumer>
        {
            (username)=>{
                return <h1>Hello {username}</h1>
            }
        }
      </ContextConsumer>
    )
  }
}

export default ComponentF
