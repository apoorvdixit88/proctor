import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/userdata')
      .then(response => response.json())
      .then(data => setUserData(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Test Invitation Code</th>
        </tr>
      </thead>
      <tbody>
        <h1>inside body</h1>
        {userData.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.testInvitationCode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminPanel;