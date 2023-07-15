import React, { useEffect, useState } from 'react';

function AdminPage() {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminExists, setAdminExists] = useState(false);
  const [adminAdded, setAdminAdded] = useState(false);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, [adminAdded]);

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/admin-list',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAdmins(data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const addAdmin = async () => {
    try {
      const response = await fetch('/add-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });
      if (response.ok) {
        const result = await response.json();
        if (result === 'already exists') {
          setAdminExists(true);
          setAdminAdded(false);
        } else {
          setAdminExists(false);
          setAdminAdded(true);
        }
        console.log('result: ', result);
      } else {
        console.log('Failed to add Admin');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const deleteAdmin = async (adminId, adminEmail) => {
    try {
      const response = await fetch("/delete-admin", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: adminEmail})
      });
      if (response.ok) {
        setAdmins(admins.filter((admin) => admin._id !== adminId));
      } else {
        console.log('Failed to delete admin');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="adminPage">
      <h3>Admin List</h3>
      {admins.map((admin) => (
        <div className="admins">
          <p key={admin._id}>{admin.email}</p>
          <button onClick={()=>deleteAdmin(admin._id, admin.email)}>Delete</button>
        </div>
      ))}

      <form className="adminAdd">
        <input
          type="text"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          placeholder="Enter Admin email"
        />
        <input
          type="text"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="Enter Admin Password"
        />
        <button onClick={addAdmin}>Add Admin</button>
        {adminExists && <p>Admin already exists.</p>}
        {adminAdded && <p>Admin added successfully.</p>}
        {/* <button onClick={deleteAdmin}>Delete Admin</button> */}
      </form>

      <button>Wipe data</button>
    </div>
  );
}

export default AdminPage;
