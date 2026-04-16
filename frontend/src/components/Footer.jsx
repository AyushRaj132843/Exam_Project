import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <p>© 2026 Quiz & Exam System</p>

      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/services">Services</Link>
      </div>

      <p>Contact: support@quizexam.com</p>

    </footer>
  );
}

export default Footer;