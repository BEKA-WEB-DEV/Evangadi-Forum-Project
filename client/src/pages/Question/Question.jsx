import { useEffect, useState, useContext } from "react";
import classes from "./Question.module.css";
import { axiosInstance } from "../../utility/axios"; // Use Axios for API calls
import QuestionCard from "../../components/QuestionCard/QuestionCard.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { UserState } from "../../App.js";

function Question() {
  const [questions, setQuestions] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false); // Loader state
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const questionsPerPage = 5; // Number of questions per page

  const { user } = useContext(UserState);
  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      console.error("User is not logged in.");
      // Redirect or show an error message if user context is missing
      return;
    }
  }, [user]);

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/questions");
        setQuestions(response.data.data || []); // Set questions from API response or empty array
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]); // Set to empty array on error
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
              imageUrl={question.image} // Pass imageUrl
              audioUrl={question.audio} // Pass audioUrl
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
