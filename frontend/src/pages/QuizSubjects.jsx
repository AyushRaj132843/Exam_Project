import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function QuizSubjects() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/login');
    }
  }, [navigate]);

  const subjects = ["AWT", "AJT", "COA", "OS", "CN"];

  return (
    <div className="quiz-subjects">
    {/* <div className="quiz-subjects-page"> */}

      <h2>Select Subject</h2>

      <div className="subjects">
        {subjects.map((sub) => (
          <Link key={sub} to={`/quiz/${sub}`} className="subject-btn">
            {sub}
          </Link>
        ))}
      </div>

    </div>
  );
}

export default QuizSubjects;