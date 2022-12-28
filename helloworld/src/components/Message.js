import React, {Component} from 'react'

class Message extends Component{
    constructor(){
        super()
        this.state={
            Message: "Welcome Visitor"
        }
    }

    Subscribed(){
        this.setState({
            Message: "Thank you for subscribing"
    })
    }


    render(){
        return (
            <div>
                <h1>{this.state.Message}</h1>
                <button onClick={()=>this.Subscribed()}>Subscribe</button>
            </div>
        )
    }
}

export default Message