import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import "../styles/login.css";
import { UserInfoContext } from "../context/UserInfoContext";

function Login() {
  // State variables for form fields and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser_id } = React.useContext(UserInfoContext);
  const { setDisplay_name } = React.useContext(UserInfoContext);

  // State variable for disabling the submit button during login
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setError("Please fill in all fields");
    } else {
      setError("");
      setSubmitButtonDisabled(true);

      // Firebase login
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser_id(user.uid);
          setDisplay_name(user.displayName); // Set display name in context
          user.getIdToken().then((token) => {
            console.log("Token:", token);
          });
          console.log(user);
          navigate("/QnA-Input"); // Navigate to QnA page after successful login
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          setError("Invalid email or password. Please try again.");
          setSubmitButtonDisabled(false); // Enable the submit button again after an error
          toast.error("Invalid email or password. Please try again."); // Display toast notification
        });
    }
  };

  // Function to handle Google sign in
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();

    // Firebase Google sign in
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser_id(user.uid);
        setDisplay_name(user.displayName); // Set display name in context
        user.getIdToken().then((token) => {
          console.log("Token:", token);
        });
        
        navigate("/QnA-Input"); // Navigate to QnA page after successful Google sign in
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
        setError("Error signing in with Google. Please try again.");
        toast.error("Error signing in with Google. Please try again."); // Display toast notification
      });
  };

  // Render the login form and Google sign in button
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
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
          <div className="submit-buttons">
            <button type="submit" disabled={submitButtonDisabled}>
              Login
            </button>
          </div>
        </form>
        <div className="google-button">
          <a className="glassIco" onClick={handleGoogleSignIn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              width="20"
              height="20"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </a>
        </div>
        <div className="hyperlinks">
          <p>
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
          <p>
            <Link to="/forgot">
              <span>Forgot Password?</span>
            </Link>
          </p>
          <p>{error}</p>
        </div>
      </div>
      <div className="blob"></div>
    </div>
  );
}

export default Login;
