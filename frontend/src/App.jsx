import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import QuizSubjects from "./pages/QuizSubjects";
import QuizPage from "./pages/QuizPage";
import ExamLogin from "./pages/ExamLogin";
import Services from "./pages/Services";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizSubjects />} />
        <Route path="/quiz/:subject" element={<QuizPage />} />
        <Route path="/exam" element={<ExamLogin />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/signup" element={<StudentSignup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
