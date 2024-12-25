import { useContext, useEffect, useState } from "react";
import classes from "./Home.module.css";
import { BsArrowRightSquareFill } from "react-icons/bs";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { UserState } from "../../App";
import Question from "../Question/Question";

function Home() {
  const { user } = useContext(UserState);
  const userName = String(user?.username).toUpperCase();
  const [greeting, setGreeting] = useState("");

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

  return (
    <Layout>
      <div className={classes.home_container}>
        {/* Welcome and Ask Question Section */}
        <div className={classes.ask_welcome_holder}>
          <div className={classes.ask_question}>
            <Link to="/ask" style={{ textDecoration: "none" }}>
              <button className={classes.ask_btn}>
                <span>I've got a question</span>
                <BsArrowRightSquareFill size={20} />
              </button>
            </Link>
          </div>
          <div className={classes.welcome_msg}>
            <p>
              {greeting},
              <span className={classes.userName}>
                {userName.charAt(0).toUpperCase() + userName.slice(1) &&
                userName.length > 10
                  ? userName.substring(0, 10).concat(". . .")
                  : userName}
              </span>
            </p>
          </div>
        </div>

        {/* Questions List */}
        <div className={classes.questions_list}>
          <Question />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
