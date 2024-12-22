import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../utility/axios"; // Use Axios for API calls
import Layout from "../../components/Layout/Layout";
import classes from "./Answer.module.css";
import { MdAccountCircle } from "react-icons/md";
import { FaClipboardQuestion } from "react-icons/fa6";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import moment from "moment";
import { UserState } from "../../App.js";
import { LuCalendarClock } from "react-icons/lu";
import Swal from "sweetalert2";

function Answer() {
  const [questionDetails, setQuestionDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [expandedAnswer, setExpandedAnswer] = useState(null);
  const [answerText, setAnswerText] = useState(""); // Controlled input state
  const { user } = useContext(UserState);
  const userid = user?.userid;
  const { questionid } = useParams();

  // Fetch the question details
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/questions/${questionid}`)
      .then((res) => {
        setQuestionDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching question details:", err);
      });
  }, [questionid]);

  // Post a new answer to the question
  async function handlePostAnswer(e) {
    e.preventDefault();
    setIsPosting(true);

    try {
      const response = await axiosInstance.post("/answers", {
        userid: userid,
        answer: answerText,
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
        Swal.fire({
          title: "Error",
          text: "Failed to post answer",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to post answer. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsPosting(false);
    }
  }

  // Toggle expand/collapse for the answer
  const toggleExpandAnswer = (answerId) => {
    setExpandedAnswer((prev) => (prev === answerId ? null : answerId));
  };

  // Function to truncate text after a word limit
  const truncateText = (text, limit = 50, answerId) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length > limit && expandedAnswer !== answerId) {
      return (
        <>
          {words.slice(0, limit).join(" ")}{" "}
          <span
            style={{ color: "var(--blue-shade)", cursor: "pointer" }}
            onClick={() => toggleExpandAnswer(answerId)}
          >
            ...See More
          </span>
        </>
      );
    }
    return text;
  };

  return (
    <Layout>
      {loading ? (
        <div className={classes.spinnerContainer}>
          <div className={classes.spinner}></div>
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.mainContainer}>
            {/* Question Section */}
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <div>
                <FaClipboardQuestion
                  size={35}
                  style={{ marginRight: "10px" }}
                />
              </div>
              <div>
                <h1 className={classes.questionTitle}>
                  {questionDetails?.title}
                </h1>
                <p className={classes.questionDescription}>
                  {questionDetails?.description}
                </p>
                <p className={classes.question_date}>
                  Asked by:{" "}
                  <span style={{ fontWeight: "600" }}>
                    @{questionDetails?.qtn_username}
                  </span>{" "}
                  <br />
                  <LuCalendarClock style={{ marginRight: "5px" }} size={19} />
                  {moment(questionDetails.qtn_createdAt)
                    .format("ddd, MMM DD, YYYY h:mm A")
                    .toUpperCase()}
                </p>
              </div>
            </div>

            {/* Answers Section */}
            <h2
              style={{ padding: "5px 0", textAlign: "left", fontWeight: "600" }}
            >
              <MdOutlineQuestionAnswer
                size={35}
                style={{ marginRight: "10px" }}
              />
              Answers From the Community:
            </h2>
            {questionDetails?.answers?.length > 0 ? (
              questionDetails?.answers?.map((answer) => (
                <div key={answer?.answerid} className={classes.answer_holder}>
                  <div className={classes.account_holder}>
                    <MdAccountCircle size={50} />
                    <div className={classes.profileName}>
                      @{answer?.username}
                    </div>
                  </div>
                  <div className={classes.answerTextContainer}>
                    <p className={classes.answerText}>
                      {truncateText(answer?.answer, 50, answer?.answerid)}
                    </p>
                    <p className={classes.answer_date}>
                      <LuCalendarClock
                        style={{ marginRight: "5px" }}
                        size={19}
                      />
                      {moment(answer?.createdAt)
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
                </span>{" "}
                <br /> Be the first to contribute your answer and help the
                community.
              </p>
            )}

            {/* Form to submit a new answer */}
            <section className={classes.answerFormSection}>
              <h3 className={classes.answerFormTitle}>
                Answer The Top Question
              </h3>
              <Link to="/" className={classes.questionPageLink}>
                Go to Question page
              </Link>
              <form onSubmit={handlePostAnswer}>
                <textarea
                  placeholder="Your Answer..."
                  className={classes.answerInput}
                  required
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                />
                <button
                  className={classes.postAnswerButton}
                  type="submit"
                  disabled={isPosting}
                >
                  {isPosting ? "Posting..." : "Post Your Answer"}
                </button>
              </form>
            </section>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Answer;
