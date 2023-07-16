
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  const nav = useNavigate();

  const [admin, setAdmin] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className='Admin'>
      <form className='AdminLogin' onSubmit={(e) => {
        try {
          e.preventDefault();
          let creds = {
            email: admin,
            password: password
          }
          console.log(creds)
          axios.post('/admin-login-submit', creds)
            .then(
              (res) => {
                if (res.data === 'successful') {
                  nav('/admin-page')
                  console.log(res);
                }
                else {
                  alert("Only admins are allowed")
                }
              }).catch(e => console.log(e))
        } catch (error) {
          console.log(error);
        }
      }}>
        <h2>Admin Login</h2>
        <label htmlFor="">Admin Id</label>
        <input name='admin' required onChange={(e) => setAdmin(e.target.value)} />
        <label htmlFor="">Password</label>
        <input name='password' type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div >
  )
}

export default AdminLogin
