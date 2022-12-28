import React, { useState } from 'react'
import axios from 'axios';

function Displaydata() {
    const [users, setUsers]=useState([])
    const url = 'http://localhost/react/displayphp.php';
    axios.get(url)
    .then(response=>{
        setUsers(response.data)
        console.log(users)
    })
    .catch(error=> alert(error));
  return (
    <div>
      <h1>User details</h1>
        {
          users.length ?
          users.map(user=> <div key={user.email}>{user.username} {user.language} {user.email}</div>
        // users.map(user=>alert(user.username)
        ) : null
        }
    </div>
  )
}

export default Displaydata
