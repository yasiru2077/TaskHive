import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NavBar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      // Call backend to clear the authentication cookie
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

      // Update frontend state
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error);
    }
  };

  return (
    <div>
      <nav>
        <ol>
          <li onClick={handleLogOut} style={{ cursor: "pointer" }}>Logout</li>
        </ol>
      </nav>
    </div>
  );
}

export default NavBar;
