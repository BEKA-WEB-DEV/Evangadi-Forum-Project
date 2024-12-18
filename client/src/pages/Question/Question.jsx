// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function Question() {
//   const { id } = useParams();
//   const [question, setQuestion] = useState({});
//   const [answers, setAnswers] = useState([]);

//   useEffect(() => {
//     // Fetch question details
//     fetch(`/api/question/${id}`)
//       .then((res) => res.json())
//       .then((data) => setQuestion(data));

//     // Fetch answers for the question
//     fetch(`/api/answer/${id}`)
//       .then((res) => res.json())
//       .then((data) => setAnswers(data));
//   }, [id]);

//   return (
//     <div>
//       <h1>{question.title}</h1>
//       <p>{question.body}</p>

//       {/* Render Question Media */}
//       {question.image && (
//         <img
//           src={question.image}
//           alt="Question Media"
//           style={{ maxWidth: "100%" }}
//         />
//       )}
//       {question.audio && (
//         <audio controls>
//           <source src={question.audio} type="audio/mpeg" />
//           Your browser does not support the audio element.
//         </audio>
//       )}

//       <h2>Answers</h2>
//       {answers.map((ans) => (
//         <div key={ans.id}>
//           <p>{ans.text}</p>

//           {/* Render Answer Media */}
//           {ans.image && (
//             <img
//               src={ans.image}
//               alt="Answer Media"
//               style={{ maxWidth: "100%" }}
//             />
//           )}
//           {ans.audio && (
//             <audio controls>
//               <source src={ans.audio} type="audio/mpeg" />
//               Your browser does not support the audio element.
//             </audio>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Question;

// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { fetchQuestionDetails, fetchAnswers } from "../utils/api";

// // function Question() {
// //   const { id } = useParams();
// //   const [question, setQuestion] = useState({});
// //   const [answers, setAnswers] = useState([]);

// //   useEffect(() => {
// //     fetchQuestionDetails(id).then(setQuestion);
// //     fetchAnswers(id).then(setAnswers);
// //   }, [id]);

// //   return (
// //     <div>
// //       <h1>{question.title}</h1>
// //       <p>{question.body}</p>
// //       <h2>Answers</h2>
// //       {answers.map((ans) => (
// //         <p key={ans.id}>{ans.text}</p>
// //       ))}
// //     </div>
// //   );
// // }

// // export default Question;

import { useEffect, useState, useContext } from "react";
import classes from "./Question.module.css";
import { axiosInstance } from "../../utility/axios.js";
import QuestionCard from "../../components/QuestionCard/QuestionCard.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { UserState } from "../../App.js";

function Question() {
  const [questions, setQuestions] = useState([]); // Store all questions
  const [loading, setLoading] = useState(false); // Loader state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const questionsPerPage = 5; // Number of questions per page

  const { user } = useContext(UserState);

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/questions");
        setQuestions(response.data.message); // Set questions from API response
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Filter questions based on search query
  const filteredQuestions = questions.filter((question) => {
    const titleMatches = question.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const descriptionMatches = question.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatches || descriptionMatches;
  });

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage; // Index of the last question
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage; // Index of the first question
  const currentQuestions = filteredQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  ); // Get the current page's questions

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage); // Total pages calculation

  // Handlers for "Previous" and "Next" buttons
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Go to previous page
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Go to next page
    }
  };

  return (
    <div className={classes.container}>
      {/* Search bar */}
      <div className={classes.search_question}>
        <input
          type="text"
          placeholder="Search for a question"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>
      <hr />
      <h1 className={classes.title}>Questions</h1>

      {/* Display loader when loading */}
      {loading ? (
        <Loader />
      ) : filteredQuestions.length === 0 ? (
        <div className={classes.no_questions}>
          <p>No Questions Found</p>
        </div>
      ) : (
        <>
          {/* Display questions for the current page */}
          {currentQuestions.map((question) => (
            <QuestionCard
              key={question.questionid}
              id={question.questionid}
              userName={question.username}
              questionTitle={question.title}
              description={question.description}
              question_date={question.createdAt}
              imageUrl={question.imageUrl} // Pass imageUrl
              audioUrl={question.audioUrl} // Pass audioUrl
            />
          ))}

          {/* Pagination controls */}
          <div className={classes.pagination}>
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1} // Disable if on first page
              className={classes.pagination_button}
            >
              Previous
            </button>

            {/* Page information */}
            <span>
              Page {currentPage} of {totalPages}
            </span>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages} // Disable if on last page
              className={classes.pagination_button}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Question;
