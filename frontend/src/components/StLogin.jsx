import React, { useState } from 'react'
import axios from 'axios'

function StLogin() {
  const [email, setEmail] = useState("");
  return (
    <div className='Login'>
      <div className="content">
        <h1>CYPHER'S CRITIQUE</h1>
        <h3>Student Feedback form</h3>
        <form action="" onSubmit={(e) => {
          console.log(email);
          e.preventDefault();
          const emailSend = {
            "email": email
          }
          axios.get('https://cypher-backend.onrender.com/even-sem-subjects', emailSend).then((res) => console.log(res)).catch(e => console.log(e))
          axios.post('https://cypher-backend.onrender.com/student-login-submit', emailSend)
            .then(
              (res) => {
                console.log(res);
                if (res.data === 'u r in') {
                  window.location.href = "https://cyphers-critique.onrender.com/form";
                  console.log(res);
                }
                else {
                  alert("Already logged in once")
                }
              }).catch(e => console.log(e))

          // axios.get('/even-sem-subjects', emailSend).then((res) => console.log(res)).catch(e => console.log(e))
          // axios.post('/student-login-submit', emailSend).then((res) => console.log(res)).catch(e => console.log(e))
        }}>
          <label htmlFor="text">Enter your email ID</label><br />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div >
  )
}

export default StLogin