import classes from "./QuestionCard.module.css";
import { MdAccountCircle } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import moment from "moment";
import { LuCalendarClock } from "react-icons/lu";
import { useContext } from "react";
import { UserState } from "../../App";

function QuestionCard({
  id,
  questionTitle,
  description,
  question_date,
  imageUrl,
  audioUrl,
}) {
  const { user } = useContext(UserState);
  const userName = String(user?.username).toUpperCase();
  const formattedDate = moment(question_date)
    .format("ddd, MMM DD, YYYY h:mm A")
    .toUpperCase();

  return (
    <Link
      to={`/questions/${id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className={classes.question_holder}>
        <div className={classes.requester_question_holder}>
          {/* User Info Section */}
          <div className={classes.requester_holder}>
            <MdAccountCircle size={50} />
            <div>
              @
              {userName && userName.length > 10
                ? userName.substring(0, 10).concat(". . .") // Display only first 10 characters
                : userName}
            </div>
          </div>

          {/* Question Content */}
          <div className={classes.title_description_holder}>
            <p className={classes.question_title}>
              {String(questionTitle).length > 100
                ? String(questionTitle).substring(0, 100).concat(". . .")
                : questionTitle}
            </p>
            <p className={classes.question_description}>
              {String(description).length > 300
                ? String(description).substring(0, 300).concat(". . .")
                : description}
            </p>
            <p className={classes.question_date}>
              <LuCalendarClock style={{ marginRight: "5px" }} />
              {formattedDate}
            </p>
          </div>

          {/* Image Display */}
          {imageUrl && (
            <div className={classes.image_container}>
              <img
                src={imageUrl}
                alt="Question"
                className={classes.question_image}
              />
            </div>
          )}

          {/* Audio Playback */}
          {audioUrl && (
            <div className={classes.audio_container}>
              <audio controls className={classes.audio_player}>
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>

        {/* Navigation Arrow */}
        <div className={classes.question_arrow_holder}>
          <div>
            <FaChevronRight size={23} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default QuestionCard;
