import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { username, password });
      
      if (!data.isAdmin) {
        setError("User is not an administrator");
        return;
      }
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      alert('Admin Successfully logged in!');
      navigate('/admin'); // Navigate to dashboard
      window.location.reload(); // To update navbar
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="center-form">
      <h2>Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Admin Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Admin Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{ backgroundColor: '#ffb703' }}>Admin Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
