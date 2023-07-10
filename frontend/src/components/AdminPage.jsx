import React, { useEffect, useState } from 'react'

function AdminPage() {

  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState([]);

  useEffect(()=>{
    fetchAdmins();
  }, []);

  const fetchAdmins = async() => {
    try{
      const response = await fetch('');
      if(response.ok){
        const data = await response.json();
        setAdmins(data);
      }
      else{
        console.log("failed to fetch admins");
      }
    }
    catch(error){
      console.log('Error: ', error);
    }
  }

  const addAdmin = async () =>{
    try{
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: newAdmin})
      })
      if(response.ok){
        const createdAdmin = await response.json();
        setAdmins([...admins, createdAdmin]);
        setNewAdmin('');
      }
      else{
        console.log("Failed to add Admin");
      }
    }
    catch(error){
      console.log('Error: ', error);
    }
  }

  const deleteAdmin = async (adminId)=>{
    try{
      const response = await fetch('', {
        method: 'DELETE'
      })
      if(response.ok){
        setAdmins(admins.filter((admin) => admin.id !== adminId));
      }
      else{
        console.log("Failed to delete admin");
      }
    }
    catch(error){
      console.log('Error :', error)
    }
  }
  return (
    <div className='adminPage'>
      <button>Admin List</button>
      <button onClick={addAdmin}>Add Admin</button>
      <button onClick={deleteAdmin}>Delete Admin</button>

      <span>
        <h3>Result list</h3>
        <select name="result" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </span>

      <button>Wipe data</button>

    </div>
  )
}

export default AdminPage