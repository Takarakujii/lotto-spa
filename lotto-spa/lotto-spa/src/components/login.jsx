import { useState } from "react";
import "../style/login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-title">
          <h2>Login to your Account!</h2>

          <input
            type="text"
            placeholder="Enter Username or Email"
            className="fulls-inputs"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="fulls-inputs"
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
            <button className="submit2-btn2">Log In</button>
            <button className="submit2-btn2 forgot-btn2">Forgot Password</button>
          </div>

          <p className="signup-links">
            Don't Have an Account? <span>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
