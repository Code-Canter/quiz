import React, { useState, useEffect } from "react";

function Quiz({ questions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (questions.length > 0) {
      const question = questions[currentQuestionIndex];
      setShuffledOptions(shuffleArray([...question.incorrect_answers, question.correct_answer]));
    }
  }, [currentQuestionIndex, questions]);

  if (!questions || questions.length === 0) {
    return <div style={styles.noQuestions}>No questions available.</div>;
  }

  const question = questions[currentQuestionIndex];

  const handleAnswer = (answer) => {
    if (answered) return;

    setSelectedAnswer(answer);
    if (answer === question.correct_answer) {
      setScore(score + 1);
    }

    setAnswered(true);
  };

  const nextQuestion = () => {
    setAnswered(false);
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  const getButtonStyle = (option) => {
    if (answered) {
      if (option === question.correct_answer) {
        return styles.optionButtonCorrect;
      } else if (option === selectedAnswer && option !== question.correct_answer) {
        return styles.optionButtonIncorrect;
      }
    }
    return styles.optionButton;
  };

  return (
    <div style={styles.quizContainer}>
      <div style={styles.progressBarContainer}>
        <div style={{ ...styles.progressBar, width: `${progressPercentage}%` }} />
      </div>
      <h2 style={styles.questionTitle}>Question {currentQuestionIndex + 1}</h2>
      <p style={styles.questionText}>{question.question}</p>
      <div style={styles.optionsContainer}>
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            style={getButtonStyle(option)}
            onClick={() => handleAnswer(option)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>
      {answered && currentQuestionIndex < questions.length - 1 && (
        <button style={styles.nextButton} onClick={nextQuestion}>
          Next Question
        </button>
      )}
      {answered && currentQuestionIndex === questions.length - 1 && (
        <div style={styles.scoreContainer}>
          <h3>Your final score is: {score}</h3>
        </div>
      )}
    </div>
  );
}

const styles = {
  quizContainer: {
    maxWidth: "600px",
    minWidth: '-webkit-fill-available',
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  progressBarContainer: {
    height: "10px",
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  questionTitle: {
    fontSize: "20px",
    color: "#333",
    marginBottom: "10px",
  },
  questionText: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  optionButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#007bff",
    backgroundColor: "transparent",
    border: "2px solid #007bff",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  optionButtonCorrect: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "2px solid #28a745",
    borderRadius: "5px",
    cursor: "pointer",
  },
  optionButtonIncorrect: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#dc3545",
    border: "2px solid #dc3545",
    borderRadius: "5px",
    cursor: "pointer",
  },
  nextButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  scoreContainer: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  noQuestions: {
    textAlign: "center",
    fontSize: "18px",
    color: "#555",
  },
};

export default Quiz;
