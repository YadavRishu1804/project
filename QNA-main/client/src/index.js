// THIS IS THE ENTRY POINT OF THE APPLICATION

// Import the React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the stylesheet
import './index.css';

// Import the App component
import App from './App';

// Render the App component to the screen
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);