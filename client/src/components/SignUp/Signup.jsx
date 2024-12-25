import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utility/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

function SignUp({ onSwitch }) {
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loader state
  const [error, setError] = useState(null); // Error state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate(); // Navigation hook

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (
      !formData.username ||
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setLoading(true); // Show loader
    setError(null); // Reset error state

    try {
      const response = await axiosInstance.post("/user/register", formData);

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "User registered successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/"); // Redirect to login page
      } else {
        throw new Error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error registering user.");
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Error registering user.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className={classes.container}>
      <h2>Join the network</h2>
      <p className={classes.signintext}>
        Already have an account?{" "}
        <span
          onClick={onSwitch}
          style={{ cursor: "pointer", color: "var(--primary-color)" }}
        >
          Sign in
        </span>
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
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Last name"
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
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
        <div className={classes.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className={classes.togglePassword}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className={classes.terms}>
          <div style={{ padding: "5px", fontSize: "13px" }}>
            I agree to the <Link to="#">privacy policy</Link> and{" "}
            <Link to="#">terms of service</Link>.
          </div>
        </div>
        <button
          type="submit"
          className={classes.submitButton}
          disabled={loading}
        >
          {loading ? "Registering..." : "Agree and Join"}
        </button>
      </form>
      {error && <p className={classes.error}>{error}</p>}
      <p className={classes.signInPrompt}>
        <span
          onClick={onSwitch}
          style={{ cursor: "pointer", color: "var(--primary-color)" }}
        >
          Already have an account?
        </span>
      </p>
    </div>
  );
}

export default SignUp;
