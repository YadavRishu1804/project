import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { UserInfoContext } from "../context/UserInfoContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
    } else if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (!isValidPassword(password)) {
      setError(
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
    } else {
      setError("");
      setSubmitButtonDisabled(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log("Signup successful");
          navigate("/login");
          toast.success("Signup successful"); // Show success toast
        })
        .catch((error) => {
          setError(error.message);
          setSubmitButtonDisabled(false);
          toast.error(error.message); // Show error toast
        });
    }
  };

  const isValidEmail = (email) => {
    // Regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Regular expression for password strength validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="submit-buttons">
            <button type="submit" disabled={submitButtonDisabled}>
              Signup
            </button>
          </div>
        </form>
        <div className="hyperlinks">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <p>{error}</p>
        </div>
      </div>
      <div className="blob"></div>
    </div>
  );
}

export default Signup;
