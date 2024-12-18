import React, { useState } from "react";

function SignUp() {
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <div>
        <input
          type="text"
          placeholder="First name"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last name"
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </div>
      <input
        type="email"
        placeholder="Email address"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
