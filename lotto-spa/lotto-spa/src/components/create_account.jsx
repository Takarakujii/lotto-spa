import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useState } from "react";
import axios from "axios"; // Import Axios
import "../style/create_account.css";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState(""); // New state for birthdate
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Input validation
    if (!username || !email || !password || !birthdate) {
     

      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/v1/account/", {
        username,
        email,
        password,
        birthdate, // Include birthdate in the request
      }, {
        headers: {
          apikey: 'hotdog',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log("Account created successfully:", response.data); // Handle success
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error creating account:", error);
      setError("Error creating account. Please try again."); // Set error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="form-box">
          <div className="another-container">
            <h2>Create your First Account!</h2>

            {error && <p className="error-message">{error}</p>} {/* Display error message */}

            <input 
              type="text" 
              placeholder="Enter Username" 
              className="full-input" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="email" 
              placeholder="Enter Email" 
              className="full-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="date" // New input for birthdate
              placeholder="Enter Birthdate" 
              className="full-input" 
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />

            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter Password" 
                className="full-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="showPassword" 
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>

            <button type="submit" className="submit-btn">Create Account</button>

            <p className="login-link">
              Already Have an Account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateAccount;