import React, { useState } from 'react'
import axios from 'axios';

function MyForm () {
    const [username, setUsername]=useState('')
    const [email, setEmail]=useState('')
    const [language, setLanguage]=useState('React')
   
    const submitHandler=event=>{
      if(username.length === 0){
        alert("Username has left Blank!");
      }
      else if(email.length === 0){
        alert("Email has left Blank!");
      }
      else{
        const url = 'http://localhost/react/displayphp.php';
        let fData = new FormData();
        fData.append('username', username);
        fData.append('email', email);
        fData.append('language', language);
        axios.post(url, fData).then(response=> alert(response.data)).catch(error=> alert(error));
      }
    }

    return (
      <form onSubmit={submitHandler}>
        <label>Username: </label>
        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/><br /><br />
        <label>Email: </label>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/><br /><br />
        <label>Language: </label>
        <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
            <option value='React'>React</option>
            <option value='Java'>Java</option>
            <option value='Python'>Python</option>
            <option value='PHP'>PHP</option>
            <option value='C++'>C++</option>
        </select><br /><br />
        <button type='submit'>Submit</button>
      </form>
    )
  }


export default MyForm
