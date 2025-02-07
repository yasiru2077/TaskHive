import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const navigate = useNavigate(); // Corrected useNavigate hook

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // Fixed the incorrect value assignment
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/login", inputs, {
        withCredentials: true,
      });

      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      

      navigate("/"); // Redirect after successful login
    } catch (err) {
      setErr(err.response?.data || "An error occurred"); // Improved error handling
    }
  };

  return (
    <div className="login-container">
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
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {err && <p className="error">{err}</p>}
      </form>
    </div>
  );
}

export default Login;
