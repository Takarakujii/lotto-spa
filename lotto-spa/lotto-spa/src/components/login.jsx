import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; 
import "../style/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors before submission

    if (!username || !password) {
      setError("Username/Email and Password are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/v1/account/login",
        {
          username: username, // Fixed field name
          password,
        },
        {
          headers: {
            apikey: "hotdog", // Include if required
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("API Response:", response.data); // Debug response
      console.log("token", response.data.data.token); // Debug token

      const token = response.data.data.token; // Adjust as needed
      if (token) {
        localStorage.setItem("jwttoken", token); // Store the token in local storage
        console.log("Logged in successfully, token:", token); // Print the token
      } else {
        setError("Login failed. No token received."); // Set error message if token is not present
      }
      
      navigate("/dashboard"); // Redirect after login

    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        <div className="login-card">
          <div className="login-title">
            <h2>Login to your Account!</h2>

            {error && <p className="error-message">{error}</p>} {/* Show errors */}

            <input
              type="text"
              placeholder="Enter Username"
              className="fulls-inputs"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="fulls-inputs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="checkboxs-groups">
              <input
                type="checkbox"
                id="showPassword"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>

            <div className="login-buttons">
              <button type="submit" className="submit2-btn2">Log In</button>
              <button className="submit2-btn2 forgot-btn2">Forgot Password</button>
            </div>

            <p className="signup-links">
              Don't Have an Account? <Link to="/create-account">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
