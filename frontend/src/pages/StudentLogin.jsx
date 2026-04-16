import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function StudentLogin() {
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      alert('Successfully logged in!');
      navigate('/quiz'); // Navigate after login
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="center-form">
      <h2>Student Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Lastname" 
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default StudentLogin;