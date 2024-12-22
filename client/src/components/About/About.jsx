import React from "react";
import { Link } from "react-router-dom";
import classes from "./About.module.css";

function About() {
  return (
    <div className={classes.about_section}>
      <div className={classes.inner_container}>
        <h2>About</h2>
        <h1>Evangadi Forum</h1>
        <p>
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p>
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>

        <button className={classes.how_it_works_btn}>
          <Link to="#" style={{ color: "white", textDecoration: "none" }}>
            HOW IT WORKS
          </Link>
        </button>
      </div>
    </div>
  );
}

export default About;
