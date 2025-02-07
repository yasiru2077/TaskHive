import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // Corrected state update
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", inputs);
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      setErr(err.response?.data || "Registration failed!"); // Improved error handling
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={inputs.name}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        {err && <p className="error">{err}</p>}
      </form>
    </div>
  );
}

export default Register;
