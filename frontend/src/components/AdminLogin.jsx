
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();

  const toForm = () => {
    navigate("/form");
  }
  const toDataEntry = () => {
    navigate("/data-entry");
  }

  const [admin, setAdmin] = useState('');
  const [password, setPassword] = useState('');


  const PostData = async (e) => {
    try {
      e.preventDefault(); 
      window.location.href = "http://localhost:3000/admin-page"
      let creds = {
        email: admin,
        password: password
      }
      console.log(creds)
      const res = await fetch("/admin-login-submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });
      const data = await res.json();
      console.log(data);
      if (data) {
        window.alert("connected to backend");
        window.location.href = "http://localhost:3000/admin-page";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className='AdminLogin'>
      <h2>Admin Login</h2>
      <form>
        <label htmlFor="">Admin Id</label>
        <input name='admin' required onChange={(e) => setAdmin(e.target.value)} /><br />
        <label htmlFor="">Password</label>
        <input name='password' type="password" onChange={(e) => setPassword(e.target.value)} />
      </form>
      <button type='submit' onClick={PostData}>Submit</button>
      <button onClick={toForm}>Go to Form</button>
      <button onClick={toDataEntry}>Go to Data Entry</button>
    </div>

  )
}

export default AdminLogin
