import React, { useState } from 'react'
import axios from 'axios'

function StLogin() {
  const [email,setEmail] = useState("");
  return (
    <div className='Login'>
      <h1>Student Feedback form</h1>
      <form action="" onSubmit={(e)=>{
        console.log(email);
        e.preventDefault();
        const emailSend = {
          "email" : email
        }
        axios.post('/student-login-submit',emailSend).then((res)=>console.log(res)).catch(e => console.log(e))
      }}>
        <label htmlFor="text">Enter your email ID</label><br />
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default StLogin