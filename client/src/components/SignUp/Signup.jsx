//

import React, { useState } from "react";
import classes from "./SignUp.module.css"; // Ensure you create this CSS file
import { Link } from "react-router-dom";

function SignUp({ onSwitch }) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // API call to register
  };

  return (
    <div className={classes.container}>
      <h2>Join the network</h2>
      <p className={classes.signintext}>
        Already have an account?{" "}
        <a
          onClick={onSwitch}
          style={{ cursor: "pointer", color: "var(--primary-color)" }}
        >
          Sign in
        </a>
      </p>
      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
        <div className={classes.nameContainer}>
          <input
            type="text"
            placeholder="First name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <div className={classes.terms}>
          <div style={{ padding: "5px", fontSize: "13px" }}>
            I agree to the <Link to="#">privacy policy</Link> and{" "}
            <Link to="#">terms of service</Link>.
          </div>
        </div>
        <button type="submit" className={classes.submitButton}>
          Agree and Join
        </button>
      </form>
      <p className={classes.signInPrompt}>
        <a
          onClick={onSwitch}
          style={{ cursor: "pointer", color: "var(--primary-color)" }}
        >
          Already have an account?
        </a>
      </p>
    </div>
  );
}

export default SignUp;
