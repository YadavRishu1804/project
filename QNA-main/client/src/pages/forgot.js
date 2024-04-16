import React, { useState } from 'react';
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent. Please check your inbox.");
        navigate('/login'); // Redirect to login page
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
        toast.error("Error sending password reset email. Please try again.");
      });
  };

  return (
    <div className='login-container'>
      <div className="login-card">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="submit-buttons">
        <button type="submit">
          Send Password Reset Email
        </button>
        </div>
      </form>
      </div>
      <div className="blob"></div>
    </div>
  );
};

export default Forgot;
