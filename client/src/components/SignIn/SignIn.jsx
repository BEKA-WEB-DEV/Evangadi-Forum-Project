// import { useState } from "react";
// import { axiosInstance } from "../../utility/axios.js";
// import classes from "./Signin.module.css";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";

// function SignIn({ onSwitch }) {
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     usernameOrEmail: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleTogglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axiosInstance.post("/user/Login", {
//         usernameOrEmail: formData.usernameOrEmail,
//         password: formData.password,
//       });
//       // console.log(response.data)
//       localStorage.setItem("EV-Forum-token-G3-APR2024", response.data.token); // Store the token in local storage
//       window.location.href = "/"; // This will navigate to the / page and refresh the application
//       if (response.status === 200) {
//         setSuccess("Login successful! Redirecting...");
//         await Swal.fire({
//           title: "Success!",
//           text: "User Loggedin successfully!",
//           icon: "success",
//           confirmButtonText: "OK",
//         });
//         setError(null);
//       } else {
//         setError(response.data.msg || "Login failed.");
//         await Swal.fire({
//           title: "Error",
//           text:
//             response.data.msg || "Error submitting the form. Please try again",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//         setSuccess(null);
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.msg || "Error logging in. Please try again." + err
//       );
//       await Swal.fire({
//         title: "Error",
//         text:
//           err.response?.data?.msg ||
//           "Error submitting the form. Please try again",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//       setSuccess(null);
//     }
//   };

//   return (
//     <div className={classes.formcontainer}>
//       <div className={classes.innerContainer}>
//         <div className={classes.heading}>
//           <h2 className={classes.title}>Login to your account</h2>
//           <p className={classes.signuptext}>
//             Don't have an account?{" "}
//             <a
//               onClick={onSwitch}
//               style={{ cursor: "pointer", color: "var(--primary-color)" }}
//             >
//               create a new account
//             </a>
//           </p>
//           {error && (
//             <p className={classes.error} style={{ marginBottom: "10px" }}>
//               {error}
//             </p>
//           )}{" "}
//           {/* Display error message */}
//           {success && <p className={classes.success}>{success}</p>}
//         </div>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="usernameOrEmail"
//             placeholder="User name or Email"
//             value={formData.usernameOrEmail}
//             onChange={handleChange}
//             required
//           />
//           <div className={classes.passwordinput}>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <button type="button" onClick={handleTogglePassword} style={{}}>
//               {showPassword ? "🙉" : "🙈"}
//             </button>
//           </div>
//           <p className={classes.forgotpasswordtext}>
//             <Link to="/forgetPass">Forgot password?</Link>
//           </p>
//           <button type="submit" className={classes.submitbtn}>
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignIn;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import classes from "./Signin.module.css";

// function SignIn() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Save the token to localStorage
//         localStorage.setItem("token", result.token);
//         navigate("/"); // Redirect to Home after successful login
//       } else {
//         // Show error message from the server
//         setError(result.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className={classes.signInContainer}>
//       <div className={classes.heading}>
//         <h2 className={classes.title}>Login to your account</h2>
//         <p className={classes.signuptext}>
//           Don't have an account?{" "}
//           <a
//             onClick={onSwitch}
//             style={{ cursor: "pointer", color: "var(--primary-color)" }}
//           >
//             create a new account
//           </a>
//         </p>
//         {error && (
//           <p className={classes.error} style={{ marginBottom: "10px" }}>
//             {error}
//           </p>
//         )}{" "}
//         {/* Display error message */}
//         {success && <p className={classes.success}>{success}</p>}
//       </div>
//       {/* {error && <p className={classes.error}>{error}</p>} */}
//       <form className={classes.signInForm} onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Log In</button>
//       </form>
//     </div>
//   );
// }

// export default SignIn;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import classes from "./Signin.module.css";

// function SignIn({ onSwitch }) {
//   // Added onSwitch prop for creating a new account
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/api/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Save the token to localStorage
//         localStorage.setItem("token", result.token);
//         navigate("/"); // Redirect to Home after successful login
//       } else {
//         // Show error message from the server
//         setError(result.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again later.");
//     }
//   };

//   return (
//     <div className={classes.signInContainer}>
//       <div className={classes.heading}>
//         <h2 className={classes.title}>Login to your account</h2>
//         <p className={classes.signuptext}>
//           Don't have an account?{" "}
//           <a
//             onClick={onSwitch}
//             style={{ cursor: "pointer", color: "var(--primary-color)" }}
//           >
//             create a new account
//           </a>
//         </p>
//         {error && (
//           <p className={classes.error} style={{ marginBottom: "10px" }}>
//             {error}
//           </p>
//         )}
//       </div>
//       <form className={classes.signInForm} onSubmit={handleSubmit}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Log In</button>
//       </form>
//     </div>
//   );
// }

// export default SignIn;

// import { useState } from "react";
// import { axiosInstance } from "../../utility/axios.js";
// import classes from "./Signin.module.css";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { IonInput, IonInputPasswordToggle } from "@ionic/react";

// function SignIn({ onSwitch }) {
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     usernameOrEmail: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleTogglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axiosInstance.post("/auth/login", {
//         email_or_username: formData.usernameOrEmail,
//         password: formData.password,
//       });

//       if (response.status === 200) {
//         localStorage.setItem("EV-Forum-token", response.data.token); // Store the token
//         setSuccess("Login successful! Redirecting...");
//         await Swal.fire({
//           title: "Success!",
//           text: "User logged in successfully!",
//           icon: "success",
//           confirmButtonText: "OK",
//         });
//         setError(null);
//         window.location.href = "/"; // Redirect to the homepage
//       } else {
//         throw new Error(response.data.message || "Login failed.");
//       }
//     } catch (err) {
//       const errorMessage =
//         err.response?.data?.message || "Error logging in. Please try again.";
//       setError(errorMessage);
//       await Swal.fire({
//         title: "Error",
//         text: errorMessage,
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//       setSuccess(null);
//     }
//   };

//   return (
//     <div className={classes.formcontainer}>
//       <div className={classes.innerContainer}>
//         <div className={classes.heading}>
//           <h2 className={classes.title}>Login to your account</h2>
//           <p className={classes.signuptext}>
//             Don't have an account?{" "}
//             <a
//               onClick={onSwitch}
//               style={{ cursor: "pointer", color: "var(--primary-color)" }}
//             >
//               Create a new account
//             </a>
//           </p>
//           {error && (
//             <p className={classes.error} style={{ marginBottom: "10px" }}>
//               {error}
//             </p>
//           )}
//           {success && <p className={classes.success}>{success}</p>}
//         </div>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="usernameOrEmail"
//             placeholder="Username or Email"
//             value={formData.usernameOrEmail}
//             onChange={handleChange}
//             required
//           />
//           <div className={classes.passwordinput}>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="button"
//               onClick={handleTogglePassword}
//               className={classes.togglePassword}
//             >
//               {showPassword ? "👁️" : ""}
//             </button>
//           </div>
//           <p className={classes.forgotpasswordtext}>
//             <Link to="/forgetPass">Forgot password?</Link>
//           </p>
//           <button type="submit" className={classes.submitbtn}>
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignIn;

import { useState } from "react";
import { axiosInstance } from "../../utility/axios.js";
import classes from "./Signin.module.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IonInput, IonInputPasswordToggle } from "@ionic/react";

function SignIn({ onSwitch }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
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
      const response = await axiosInstance.post("/auth/login", {
        email_or_username: formData.usernameOrEmail,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem("EV-Forum-token", response.data.token); // Store the token
        setSuccess("Login successful! Redirecting...");
        await Swal.fire({
          title: "Success!",
          text: "User logged in successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setError(null);
        window.location.href = "/"; // Redirect to the homepage
      } else {
        throw new Error(response.data.message || "Login failed.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error logging in. Please try again.";
      setError(errorMessage);
      await Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
      setSuccess(null);
    }
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
              Create a new account
            </a>
          </p>
          {error && (
            <p className={classes.error} style={{ marginBottom: "10px" }}>
              {error}
            </p>
          )}
          {success && <p className={classes.success}>{success}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="usernameOrEmail"
            placeholder="Username or Email"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            required
          />
          <div className={classes.passwordinput}>
            {/* Ionic Input for Password */}
            <IonInput
              type="password"
              // label="Password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onIonInput={(e) =>
                handleChange({
                  target: { name: "password", value: e.target.value },
                })
              }
              required
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>
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
