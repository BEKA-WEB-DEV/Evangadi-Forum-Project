import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchQuestions } from "../../utility/axios";
// import classes from "./Home.module.css";
// import Layout from "../../components/Layout/Layout";

function Home() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  return (
    <div>
      <h1>All Questions</h1>
      {questions.map((q) => (
        <div key={q.id}>
          <h3>{q.title}</h3>
          <Link to={`/question/${q.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
