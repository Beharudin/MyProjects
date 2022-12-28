import React from 'react'

const UpdatedComponent=OriginalComponent=>{
    class NewComponent extends React.Component{
        constructor(props) {
            super(props)
        
            this.state = {
                count: 0
            }
            }
            countHandler=()=>{
                this.setState(prevState=>{
                    return {count: prevState.count+1}
                })
            }
        render(){
            return <OriginalComponent
            name='Bahar' 
            count={this.state.count} 
            countHandler={this.countHandler}/>
        }
    }
    return NewComponent
}

export default UpdatedComponent