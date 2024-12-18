// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { fetchQuestions } from "../../utility/axios";
// import Layout from "../../components/Layout/Layout";
// // import classes from "./Home.module.css";

// function Home() {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     fetchQuestions().then(setQuestions);
//   }, []);

//   return (
//     <Layout>
//       <div>
//         <h1>All Questions</h1>
//         {questions.map((q) => (
//           <div key={q.id}>
//             <h3>{q.title}</h3>
//             <Link to={`/question/${q.id}`}>View Details</Link>
//           </div>
//         ))}
//       </div>
//     </Layout>
//   );
// }

// export default Home;

import { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { BsArrowRightSquareFill } from "react-icons/bs";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { UserState } from "../../App";
import { axiosInstance } from "../../utility/axios";
import Question from "../Question/Question";

function Home() {
  const { user } = useContext(UserState);
  const userName = user?.username ? user.username : "Guest"; // Fallback for guest users
  const [greeting, setGreeting] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Determine greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    const greetingMessage =
      hour >= 5 && hour < 12
        ? "Good Morning"
        : hour >= 12 && hour < 17
        ? "Good Afternoon"
        : hour >= 17 && hour < 21
        ? "Good Evening"
        : "Good Evening";
    setGreeting(greetingMessage);
  }, []);

  // Fetch Questions
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.get("/question");
        setQuestions(response.data.questions || []);
      } catch (err) {
        setError("Failed to load questions. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <Layout>
      <div className={styles.home_container}>
        {/* Welcome and Ask Question Section */}
        <div className={styles.ask_welcome_holder}>
          <div className={styles.ask_question}>
            <Link to="/ask" style={{ textDecoration: "none" }}>
              <button className={styles.ask_btn}>
                <span>I've got a question</span>
                <BsArrowRightSquareFill size={20} />
              </button>
            </Link>
          </div>
          <div className={styles.welcome_msg}>
            <p>
              {greeting},{" "}
              <span className={styles.userName}>
                {userName.charAt(0).toUpperCase() + userName.slice(1)}
              </span>
            </p>
          </div>
        </div>

        {/* Questions List Section */}
        {/* <div className={styles.questions_list}>
          <h2>Recent Questions</h2>
          {loading && <p>Loading questions...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {!loading && !error && questions.length === 0 && (
            <p>No questions have been posted yet.</p>
          )}
          <ul className={styles.questions}>
            {questions.map((question) => (
              <li key={question.id} className={styles.question_item}>
                <h3>{question.title}</h3>
                <p>{question.description}</p>
                <Link
                  to={`/question/${question.id}`}
                  className={styles.view_question_link}
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        </div> */}
        <div className={styles.questions_list}>
          <Question />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
