import React, {Component} from 'react'

class Counter extends Component{
    constructor(){
        super()
        this.state={
            Count: 0
        }
    }

    Increment(){
        this.setState({
            Count: this.state.Count + 1
    })
    }


    render(){
        return (
            <div>
                <h1>Count-{this.state.Count}</h1>
                <button onClick={()=>this.Increment()}>Increment</button>
            </div>
        )
    }
}

export default Counter