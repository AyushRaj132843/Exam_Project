import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const userInfoStr = localStorage.getItem('userInfo');
  const user = userInfoStr ? JSON.parse(userInfoStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    alert('Successfully logged out!');
    navigate('/login');
  };

  return (
    <nav className="navbar">

      <div className="logo">
       QUIZ
      </div>
      

      <div className="nav-links">
        {user?.isAdmin ? (
          <Link to="/admin">Dashboard</Link>
        ) : (
          <Link to="/quiz">Quiz</Link>
        )}
        <Link to="/exam">Exam</Link>
        <Link to="/services">Services</Link>
        {user ? (
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem', marginLeft: '1rem' }}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={{ marginLeft: '1rem' }}>Login</Link>
            <Link to="/admin-login" style={{ marginLeft: '1rem', color: '#ffb703', fontWeight: 'bold' }}>Admin Login</Link>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;