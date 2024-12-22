import { useState } from "react";
import { axiosInstance } from "../../utility/axios.js"; // Ensure axiosInstance is properly configured
import classes from "./Signin.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignIn({ onSwitch }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Show/hide password state

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 && response.data.token) {
        // Store the token in local storage
        localStorage.setItem(
          "Evandadi-Forum-token-JUN2024",
          response.data.token
        );

        // Set the Authorization header with the token for future requests
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        // Redirect to the home page
        window.location.href = "/";

        // Display success message
        await Swal.fire({
          title: "Success!",
          text: "User logged in successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        // Handle error case
        setError(response.data.msg || "Login failed.");
        await Swal.fire({
          title: "Error",
          text:
            response.data.msg || "Error submitting the form. Please try again",
          icon: "error",
          confirmButtonText: "OK",
        });
        setSuccess(null);
      }
    } catch (err) {
      setError(
        err.response?.data?.msg || "Error logging in. Please try again."
      );
      await Swal.fire({
        title: "Error",
        text:
          err.response?.data?.msg ||
          "Error submitting the form. Please try again",
        icon: "error",
        confirmButtonText: "OK",
      });
      setSuccess(null);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={classes.formcontainer}>
      <div className={classes.innerContainer}>
        <div className={classes.heading}>
          <h2 className={classes.title}>Login to your account</h2>
          <p className={classes.signuptext}>
            Don't have an account?{" "}
            <a
              onClick={onSwitch}
              style={{ cursor: "pointer", color: "var(--primary-color)" }}
            >
              create a new account
            </a>
          </p>
          {error && (
            <p className={classes.error} style={{ marginBottom: "10px" }}>
              {error}
            </p>
          )}{" "}
          {/* Display error message */}
          {success && <p className={classes.success}>{success}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="User Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className={classes.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className={classes.togglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className={classes.forgotpasswordtext}>
            <Link to="/forgetPass">Forgot password?</Link>
          </p>
          <button type="submit" className={classes.submitbtn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
