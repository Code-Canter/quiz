import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://the-trivia-api.com/api/questions?limit=10")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((item) => ({
          question: item.question,
          correct_answer: item.correctAnswer,
          incorrect_answers: item.incorrectAnswers,
        }));
        setQuizData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data: ", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingText}>Loading quiz, please wait...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorText}>Error: {error}</div>
        <button style={styles.retryButton} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Quiz questions={quizData} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  loadingText: {
    fontSize: "20px",
    color: "#555",
  },
  errorText: {
    fontSize: "18px",
    color: "#e74c3c",
    marginBottom: "20px",
    textAlign: "center",
  },
  retryButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default App;
