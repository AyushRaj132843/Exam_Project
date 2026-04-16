import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function StudentSignup() {
  const [username, setUsername] = useState('');
  const [lastname, setLastname] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { 
        username, 
        lastname, 
        enrollmentNumber, 
        password 
      });
      alert('User successfully registered!');
      navigate('/login'); // Redirect to login after successful signup
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="center-form">
      <h2>Student Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="First Name (Username)" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Enrollment Number (Optional)" 
          value={enrollmentNumber}
          onChange={(e) => setEnrollmentNumber(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default StudentSignup;
