import { useContext, useRef, useState } from "react";
import classes from "./AskQuestion.module.css";
import { axiosInstance } from "../../../utility/axios"; // Use Axios for API calls
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import ClipLoader from "react-spinners/ClipLoader";
import { UserState } from "../../../App.js";

function AskQuestion() {
  const navigate = useNavigate();
  const { user } = useContext(UserState);

  const titleDom = useRef();
  const descriptionDom = useRef();
  const [isPosting, setIsPosting] = useState(false); // State for loading spinner
  const [image, setImage] = useState(null); // State for image file
  const [audio, setAudio] = useState(null); // State for audio file
  const userId = user?.userid;

  // Function to handle image upload
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      setImage(file);
      console.log("Image file:", file);
    } else {
      alert("No image file selected.");
    }
  }

  // Function to handle audio upload
  function handleAudioChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("audio/")) {
        alert("Please upload a valid audio file.");
        return;
      }
      setAudio(file);
      console.log("Audio file:", file);
    } else {
      alert("No audio file selected.");
    }
  }

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setIsPosting(true); // Start spinner

    const title = titleDom.current.value.trim();
    const description = descriptionDom.current.value.trim();
    const userid = userId;
    const tag = "General";

    if (!title || !description) {
      alert("Both title and description are required.");
      setIsPosting(false);
      return;
    }

    const formData = new FormData();
    formData.append("userid", userid);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tag", tag);
    if (image) formData.append("image", image);
    if (audio) formData.append("audio", audio);

    try {
      const response = await axiosInstance.post("/questions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        navigate("/");
      } else {
        alert("Failed to create question. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        alert(
          `Error: ${error.response.data.message || "Something went wrong."}`
        );
      } else {
        alert("Failed to create question. Please try again later.");
      }
    } finally {
      setIsPosting(false); // Stop spinner
    }
  }

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
                aria-label="Question title"
              />
              <textarea
                rows={4}
                className={classes.question__description}
                ref={descriptionDom}
                placeholder="Question Description..."
                required
                aria-label="Question description"
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
                  aria-label="Upload an image"
                />
                {image && (
                  <div className={classes.previewContainer}>
                    <p>Image Preview:</p>
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className={classes.imagePreview}
                    />
                  </div>
                )}
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
                  aria-label="Upload an audio file"
                />
                {audio && (
                  <div className={classes.previewContainer}>
                    <p>Audio file selected: {audio.name}</p>
                  </div>
                )}
              </div>
              <div className={classes.buttonContainer}>
                <button
                  className={classes.question__button}
                  type="submit"
                  disabled={isPosting} // Disable button while posting
                >
                  {isPosting ? (
                    <ClipLoader size={20} color="#fff" /> // Spinner while loading
                  ) : (
                    "Post Question"
                  )}
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
