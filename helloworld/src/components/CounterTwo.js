import React, {Component} from 'react'

class CounterTwo extends Component{
    constructor(){
        super()
        this.state={
            count: 0
        }
    }

    countHandler=()=>{
        this.setState({
            count: this.state.count + 1
    })
    }


    render(){
        return (
            <div>
                {this.props.render(this.state.count, this.countHandler)}
            </div>
        )
    }
}

export default CounterTwo