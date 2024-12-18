// import React, { useState } from "react";
// import { useParams } from "react-router-dom";

// function Answer() {
//   const { id } = useParams(); // Question ID
//   const [answerText, setAnswerText] = useState("");
//   const [image, setImage] = useState(null);
//   const [audio, setAudio] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("text", answerText);
//     if (image) formData.append("image", image);
//     if (audio) formData.append("audio", audio);

//     // Post the answer with text, image, and audio
//     const response = await fetch(`/api/answer`, {
//       method: "POST",
//       body: formData,
//     });

//     const result = await response.json();
//     console.log(result);
//     alert("Answer submitted successfully!");
//   };

//   return (
//     <div>
//       <h1>Submit Your Answer</h1>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           placeholder="Write your answer here..."
//           value={answerText}
//           onChange={(e) => setAnswerText(e.target.value)}
//           required
//         />

//         <label>Upload Image:</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//         />

//         <label>Upload Audio:</label>
//         <input
//           type="file"
//           accept="audio/*"
//           onChange={(e) => setAudio(e.target.files[0])}
//         />

//         <button type="submit">Submit Answer</button>
//       </form>
//     </div>
//   );
// }

// export default Answer;

// // import React, { useState } from "react";
// // import { useParams } from "react-router-dom";

// // function Answer() {
// //   const { id } = useParams(); // Question ID
// //   const [answer, setAnswer] = useState("");

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     console.log({ questionId: id, text: answer });
// //     // API call logic here
// //   };

// //   return (
// //     <div>
// //       <h1>Submit Your Answer</h1>
// //       <form onSubmit={handleSubmit}>
// //         <textarea
// //           placeholder="Write your answer here..."
// //           value={answer}
// //           onChange={(e) => setAnswer(e.target.value)}
// //           required
// //         />
// //         <button type="submit">Submit Answer</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Answer;

import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../utility/axios.js";
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
  const { user } = useContext(UserState);
  const userId = user?.userid;
  const { questionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [expandedAnswer, setExpandedAnswer] = useState(null); // State to track expanded answers
  const answerInput = useRef();

  // Fetch the question details
  useEffect(() => {
    axiosInstance.get(`/question/${questionId}`).then((res) => {
      setQuestionDetails(res.data);
      setLoading(false); // Set loading false after fetching
    });
  }, [questionId]);

  // Post a new answer to the question
  async function handlePostAnswer(e) {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/answer", {
        userid: userId,
        answer: answerInput.current.value,
        questionid: questionId,
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
            onClick={() => toggleExpandAnswer(null)} // Function will handle the expansion/collapse
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
        <div className={classes.mainContainer}>
          {/* Question Section */}
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div>
              <FaClipboardQuestion size={35} style={{ marginRight: "10px" }} />
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
              {/* Question Media */}
              {questionDetails.imageUrl && (
                <div className={classes.imageContainer}>
                  <img
                    src={questionDetails.imageUrl}
                    alt="Question Attachment"
                    className={classes.questionImage}
                  />
                </div>
              )}
              {questionDetails.audioUrl && (
                <div className={classes.audioContainer}>
                  <audio controls className={classes.audioPlayer}>
                    <source src={questionDetails.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
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
                  <div className={classes.profileName}>@{answer?.username}</div>
                </div>
                <div className={classes.answerTextContainer}>
                  <p className={classes.answerText}>
                    {expandedAnswer === answer?.answerid
                      ? answer?.answer
                      : truncateText(answer?.answer)}
                  </p>
                  <p className={classes.answer_date}>
                    <LuCalendarClock style={{ marginRight: "5px" }} size={19} />
                    {moment(answer?.createdAt)
                      .format("ddd, MMM DD, YYYY h:mm A")
                      .toUpperCase()}
                  </p>
                  {/* Answer Media */}
                  {answer.imageUrl && (
                    <div className={classes.imageContainer}>
                      <img
                        src={answer.imageUrl}
                        alt="Answer Attachment"
                        className={classes.answerImage}
                      />
                    </div>
                  )}
                  {answer.audioUrl && (
                    <div className={classes.audioContainer}>
                      <audio controls className={classes.audioPlayer}>
                        <source src={answer.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
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
            <h3 className={classes.answerFormTitle}>Answer The Top Question</h3>
            <Link to="/" className={classes.questionPageLink}>
              Go to Question page
            </Link>
            <form onSubmit={handlePostAnswer}>
              <textarea
                placeholder="Your Answer..."
                className={classes.answerInput}
                required
                ref={answerInput}
              />
              <button className={classes.postAnswerButton} type="submit">
                Post Your Answer
              </button>
            </form>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default Answer;
