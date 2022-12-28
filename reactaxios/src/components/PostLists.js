import React, { Component } from 'react'
import axios from 'axios'

class PostLists extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         posts: []
      }
    }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response=>{
          console.log(response)
            this.setState({posts: response.data})
        })
        .catch(error=>{
            console.log(error)
        }
        )
        
    }
  render() {
    const {posts}=this.state
    return (
      <div>
        <h1>Post lists</h1>
        {
          posts.length ?
          posts.map(post=><div key={post.id}>{post.title}</div>) :
          null
        }
      </div>
    )
  }
}

export default PostLists
