import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../utility/axios.js";
import Layout from "../../components/Layout/Layout";
import classes from "./Answer.module.css";
import { MdAccountCircle } from "react-icons/md";
import { FaClipboardQuestion } from "react-icons/fa6";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import moment from "moment";
import { UserState } from "../../App";
import { LuCalendarClock } from "react-icons/lu";
import Swal from "sweetalert2";

function QuestionAndAnswer() {
  const [questionDetails, setQuestionDetails] = useState({});
  const { user } = useContext(UserState);
  const userName = user?.username.toUpperCase();
  const userId = user?.userid;
  const { questionid } = useParams();
  const [loading, setLoading] = useState(true);
  const [expandedAnswer, setExpandedAnswer] = useState(null); // State to track expanded answers
  const answerInput = useRef();

  // Fetch the question details
  useEffect(() => {
    axiosInstance.get(`/questions/${questionid}`).then((res) => {
      setQuestionDetails({
        ...res.data.question,
        answers: res.data.answers, // Include the answers in state
      });
      setLoading(false);
    });
  }, [questionid]);

  // Post a new answer to the question
  async function handlePostAnswer(e) {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/answers", {
        userid: userId,
        answer: answerInput.current.value,
        questionid: questionid,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Answer submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      } else {
        throw new Error("Failed to post answer");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.msg || "Failed to post answer.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  // Function to truncate text after 100 words
  const truncateText = (text, limit = 50) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > limit) {
      return (
        <>
          {words.slice(0, limit).join(" ")}{" "}
          <span
            style={{
              color: "var(--blue-shade)",
              cursor: "pointer",
            }}
            onClick={() => setExpandedAnswer(null)}
          >
            ... See More
          </span>
        </>
      );
    }
    return text;
  };

  // Toggle expand/collapse for the answer
  const toggleExpandAnswer = (answerId) => {
    if (expandedAnswer === answerId) {
      setExpandedAnswer(null); // Collapse the answer
    } else {
      setExpandedAnswer(answerId); // Expand the answer
    }
  };

  return (
    <Layout>
      <div className={classes.container}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={classes.mainContainer}>
            {/* Question Details */}
            <div style={{ display: "flex" }}>
              <FaClipboardQuestion size={35} style={{ marginRight: "10px" }} />
              <div>
                <h1 className={classes.questionTitle}>
                  {questionDetails?.title}
                </h1>
                <p className={classes.questionDescription}>
                  {questionDetails?.description}
                </p>
                <p className={classes.question_date}>
                  Asked by:{" "}
                  <span style={{ fontWeight: "600" }}> @{userName} </span>
                  <br />
                  <LuCalendarClock size={19} style={{ marginRight: "5px" }} />
                  {moment(questionDetails.created_at)
                    .format("ddd, MMM DD, YYYY h:mm A")
                    .toUpperCase()}
                </p>
              </div>
            </div>
            <hr />

            {/* Answers Section */}
            <h2 className={classes.answersHeader}>
              <MdOutlineQuestionAnswer
                size={35}
                style={{ marginRight: "10px" }}
              />
              Answers From the Community:
            </h2>
            <hr />
            {questionDetails?.answers?.length > 0 ? (
              questionDetails.answers.map((answer) => (
                <div key={answer.answerid} className={classes.answer_holder}>
                  <div className={classes.account_holder}>
                    <MdAccountCircle size={50} />
                    <div className={classes.profileName}>{answer.username}</div>
                  </div>
                  <div
                    className={classes.answerTextContainer}
                    onClick={() => toggleExpandAnswer(answer.answerid)}
                  >
                    <p className={classes.answerText}>
                      {expandedAnswer === answer.answerid
                        ? answer.answer
                        : truncateText(answer.answer)}
                    </p>
                    <p className={classes.answer_date}>
                      <LuCalendarClock
                        size={19}
                        style={{ marginRight: "5px" }}
                      />
                      {moment(answer.created_at)
                        .format("ddd, MMM DD, YYYY h:mm A")
                        .toUpperCase()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  No answers yet!
                </span>
                <br />
                Be the first to contribute your answer.
              </p>
            )}

            {/* Answer Form */}
            <form onSubmit={handlePostAnswer} className={classes.answerForm}>
              <textarea
                placeholder="Your Answer..."
                ref={answerInput}
                required
                className={classes.answerInput}
              />
              <button type="submit" className={classes.postAnswerButton}>
                Post Your Answer
              </button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
}
export default QuestionAndAnswer;
