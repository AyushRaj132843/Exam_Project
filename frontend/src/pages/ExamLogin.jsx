import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExamLogin() {
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { enrollmentNumber, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      alert('Successfully logged in!');
      navigate('/quiz'); // Navigate after login
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="center-form">
      <h2>Exam Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Enrollment Number" 
          value={enrollmentNumber}
          onChange={(e) => setEnrollmentNumber(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default ExamLogin;