import { useState } from "react";
import "../style/create_account.css";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container">
      <div className="form-box">
        <div className="another-container">
          <h2>Create your First Account!</h2>

          <input type="text" placeholder="Enter Username" className="full-input" />


          <input type="email" placeholder="Enter Email" className="full-input" />

          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter Password" 
              className="full-input"
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

          <button className="submit-btn">Create Account</button>

          <p className="login-link">
            Already Have an Account? <span>Log in</span><line/>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;