import React, { useState } from "react";
import SignUp from "../../components/SignUp/Signup";
import SignIn from "../../components/SignIn/SignIn";
import Layout from "../../components/Layout/Layout";
import classes from "./AuthPage.module.css";
import About from "../../components/About/About";
import { useLocation } from "react-router-dom";

function AuthPage() {
  const navStateData = useLocation();
  const [isSignIn, setIsSignUp] = useState(true);

  const [isTransitioning, setIsTransitioning] = useState(false);
  // Function to toggle between SignUp and Login forms
  const toggleForm = () => {
    setIsTransitioning(true); // Start the transition
    setTimeout(() => {
      setIsSignUp((prev) => !prev); // Change the component after fade-out
      setIsTransitioning(false); // End the transition after fade-in
    }, 500); // 500ms - CSS transition duration
  };

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.inner_container}>
          <div
            className={`${classes.formContainer} ${
              isTransitioning ? classes.fadeOut : classes.fadeIn
            }`}
          >
            {isSignIn ? (
              <SignIn onSwitch={toggleForm} useLocData={navStateData} />
            ) : (
              <SignUp onSwitch={toggleForm} />
            )}
          </div>
          <div className={classes.about}>
            <About />
          </div>
        </div>
      </div>
    </Layout>

    // <div>
    //   {isSignUp ? <SignUp /> : <SignIn />}
    //   <button onClick={() => setIsSignUp(!isSignUp)}>
    //     {isSignUp
    //       ? "Already have an account? Log In"
    //       : "Don't have an account? Sign in"}
    //   </button>
    // </div>
  );
}

export default AuthPage;
