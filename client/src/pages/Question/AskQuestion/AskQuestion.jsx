import { useContext, useRef, useState } from "react";
import classes from "./AskQuestion.module.css";
import { axiosInstance } from "../../../utility/axios"; // Use Axios for API calls
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import { UserState } from "../../../App.js";
import Swal from "sweetalert2";

function AskQuestion() {
  // const navigate = useNavigate();
  // const { user } = useContext(UserState);

  // const titleDom = useRef();
  // const descriptionDom = useRef();
  // const [imageFile, setImageFile] = useState(null);
  // const [audioFile, setAudioFile] = useState(null);
  // const userId = user?.userid;

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const title = titleDom.current.value;
  //   const description = descriptionDom.current.value;
  //   const userid = userId;
  //   const tag = "General";

  //   try {
  //     // Create FormData to handle file uploads
  //     const formData = new FormData();
  //     formData.append("userid", userid);
  //     formData.append("title", title);
  //     formData.append("description", description);
  //     formData.append("tag", tag);
  //     if (imageFile) {
  //       formData.append("image", imageFile);
  //     }
  //     if (audioFile) {
  //       formData.append("audio", audioFile);
  //     }

  //     // Make a POST request to create a new question
  //     const response = await axios.post(
  //       "http://localhost:3003/api/questions",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data", // Set the content type for file uploads
  //         },
  //       }
  //     );

  //     if (response.status === 201) {
  //       console.log("Question created successfully");
  //       await Swal.fire({
  //         title: "Success!",
  //         text: "Question created successfully!",
  //         icon: "success",
  //         confirmButtonText: "OK",
  //       });
  //       navigate("/");
  //     } else {
  //       console.error("Failed to create question");
  //       await Swal.fire({
  //         title: "Error",
  //         text: "Failed to create question",
  //         icon: "error",
  //         confirmButtonText: "OK",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     await Swal.fire({
  //       title: "Error",
  //       text: "Failed to create question. Please try again later.",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   }
  const navigate = useNavigate();
  const { user } = useContext(UserState);
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  // const navigate = useNavigate();
  const titleDom = useRef();
  const descriptionDom = useRef();
  const userId = user?.userid;
  console.log(user);

  async function handleSubmit(e) {
    e.preventDefault();
    const title = titleDom.current.value;
    const description = descriptionDom.current.value;
    const userid = userId;
    const tag = "General";

    try {
      // Make a POST request to your server to create a new question
      const response = await axiosInstance.post("/questions", {
        userid,
        title,
        description,
        tag,
        image: imageFile,
        audio: audioFile,
      });
      if (response.status === 201) {
        console.log("Question created successfully");
        await Swal.fire({
          title: "Success!",
          text: "Question created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      } else {
        console.error("Failed to create question");
        await Swal.fire({
          title: "Error",
          text: "Failed to create question",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: "Error",
        text: "Failed to create question. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  return (
    <Layout>
      <div className={classes.allContainer}>
        <div className={classes.question__container}>
          <div className={classes.question__wrapper}>
            <h3 className={classes.question__header__title}>
              <span className={classes.highlight}>
                Steps To Write A Good Question
              </span>
            </h3>

            <div className={classes.questionContainer}>
              <h2 className={classes.questionTitle}>
                How to Ask a Good Question
              </h2>
              <div className={classes.questionList}>
                <ul className={classes.questionListUl}>
                  <li className={classes.questionItem}>
                    <span className={classes.icon}>📝</span>
                    Summarize your problem in a one-line title.
                  </li>
                  <li className={classes.questionItem}>
                    <span className={classes.icon}>📜</span>
                    Describe your problem in more detail.
                  </li>
                  <li className={classes.questionItem}>
                    <span className={classes.icon}>🔍</span>
                    Explain what you have tried and what you expected to happen.
                  </li>
                  <li className={classes.questionItem}>
                    <span className={classes.icon}>✅</span>
                    Review your question and post it to the site.
                  </li>
                  <li className={classes.questionItem}>
                    <span className={classes.icon}>🎙</span>
                    Add an audio file to your question.
                  </li>
                  <li className={classes.questionItem}>
                    <span className={classes.icon}>📷</span>
                    Add an image to your question.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <h4 className={classes.highlight}>Post Your Question</h4>
          <div className={classes.question__header__titleTwo}>
            <form onSubmit={handleSubmit} className={classes.question__form}>
              <input
                className={classes.question__title2}
                ref={titleDom}
                type="text"
                placeholder="Question title"
                required
              />
              <textarea
                rows={4}
                className={classes.question__description}
                ref={descriptionDom}
                placeholder="Question Description..."
                required
              />
              <div className={classes.fileUploadContainer}>
                <label htmlFor="imageUpload" className={classes.fileLabel}>
                  Upload an Image:
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={classes.fileInput}
                />
              </div>
              <div className={classes.fileUploadContainer}>
                <label htmlFor="audioUpload" className={classes.fileLabel}>
                  Upload an Audio File:
                </label>
                <input
                  id="audioUpload"
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioChange}
                  className={classes.fileInput}
                />
              </div>
              <div className={classes.buttonContainer}>
                <button className={classes.question__button} type="submit">
                  Post Question
                </button>
                <Link to="/">
                  <button className={classes.question__btn} type="button">
                    Back to Home
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AskQuestion;
