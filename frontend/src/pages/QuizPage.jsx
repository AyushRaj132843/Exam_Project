import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function QuizPage() {
  const { subject } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [start, setStart] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('userInfo')) {
      navigate('/login');
      return;
    }

    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(`/api/questions/${subject}`);
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [subject, navigate]);

  const handleOption = (opt) => {
    setSelected(opt);

    const isCorrect = opt === questions[current].answer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const next = current + 1;

      if (next < questions.length) {
        setCurrent(next);
        setSelected(null);
      } else {
        setFinished(true);
        const finalScore = isCorrect ? score + 1 : score;
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        axios.post('/api/results', {
          subject,
          score: finalScore,
          total: questions.length
        }, {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        }).catch(err => console.error(err));
      }
    }, 700);
  };

  if (loading) return <div className="quiz-page"><h2>Loading...</h2></div>;
  if (error) return <div className="quiz-page"><h2>Error loading questions: {error}</h2></div>;
  if (questions.length === 0) return <div className="quiz-page"><h2>No questions found for {subject}</h2></div>;

  return (
    <div className="quiz-page">
      <h2>{subject} Quiz</h2>

      {!start && (
        <button onClick={() => setStart(true)}>Start Quiz</button>
      )}

      {start && !finished && (
        <div className="question-box">
          <h3 className="question-number">
            Question {current + 1} / {questions.length}
          </h3>

          <p className="question-text">
            {questions[current].question}
          </p>

          <div className="options-column">
            {questions[current].options.map((opt, index) => (
              <div
                key={opt}
                className={`option ${selected === opt ? "selected" : ""}`}
                onClick={() => handleOption(opt)}
              >
                <span className="option-number">{index + 1}.</span>
                {opt}
              </div>
            ))}
          </div>
        </div>
      )}

      {finished && (
        <div className="result">
          <h2>Your Score: {score} / {questions.length}</h2>
        </div>
      )}
    </div>
  );
}

export default QuizPage;