// THIS IS THE CHATTING PAGE FOR THE USER, HE WILL LAND HERE AFTER CREATING A NEW BOT

// Import the libraries from react and react-router-dom
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

// Import the styles and assets
import "../styles/bot.css";

// Import the firebase libraries
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";

// Import the assets
import sendBtn from "../assets/send.svg";
import userIcon from "../assets/user.png";
import botIcon from "../assets/robot.png";

// Import the context
import { UserInfoContext } from "../context/UserInfoContext";
import { useRef } from "react";

// Import the axios library and the toast library
import toast from "react-hot-toast";
import axios from "axios";

// Create a functional component Bot

const Bot = () => {

  // Get the bot name and file names from the redux store
  const botName = useSelector(state => state.botName);
  const fileNames = useSelector((state) => state.fileNames);

  // Create the state variable input and setInput to handle the prompt input
  const [input, setInput] = useState("");

  // Create the state variable messages and setMessages to handle the messages
  const msgEnd = useRef(null);
  const [messages, setMessages] = useState([
    {
      text: "Hello, I am QnA.AI, your personal assistant. How can I help you today?",
      isBot: true,
    }
  ]);

  // Use the useEffect hook to scroll to the bottom of the chat window
  useEffect(() => {
    msgEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Create the function handleEnter to handle the enter key
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Get the display name from the context
  const { display_name } = React.useContext(UserInfoContext); 

  // Create the function handleSend to handle the user input

  const handleSend = async () => {

    // Get the current user
    const auth = getAuth();
    const user = auth.currentUser;

    // If the input is empty, return
    if (!input) return;

    // Create a new message object
    const text = input;

    // Clear the input
    setInput(""); 

    // Add the message to the list of messages
    setMessages([...messages, { text, isBot: false }]); 
    
    // Make a request to the backend to get the response

    await toast.promise(
      axios.get(`http://localhost:3001/api/response?user_id=${user.uid}&bot_name=${botName}&prompt=${text}`),
      {
        loading: "Generating Response...",
        success: (responseData) => {
          setMessages([
            ...messages,
            { text, isBot: false },
            { text: responseData.data, isBot: true },
          ]); 
          return "Response Generated!";
        }, 
        error: "Error in generating response. Please try again.",
      },
      {
        style: { minWidth: "250px" }
      }
    );
  
  };

  // Return the JSX for the Bot component

  return (
    <div className="bot-container">
      <div className="left-container">
        <div className="logo-section">
          <div className="logo-main">QnA.AI</div>
        </div>
        <p>
          <Link to="/QnA-Input">
            <span>Create a New BOT </span>
          </Link>
        </p>
        <div className="prev-chats">
          <h1>Bot Name : {botName}</h1>
          <ul>
            {fileNames.map((fileName, i) => (
              <li key={i}>
                <p>{fileName}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="profile-menu">
          <div className="profile-name">
            <span>Hii, </span>
            {display_name || "Guest"}
          </div>
        </div>
      </div>

      <div className="right-container">
        <div className="blob"></div>
        <div className="chat-container">
          <div className="chats">
            <div className="chat">
              {messages.map((message, i) => (
                <div key={i} className={message.isBot ? "chat bot" : "chat"}>
                  <img
                    className="chatimg "
                    src={message.isBot ? botIcon : userIcon}
                    alt=""
                  />
                  <p className="txt">{message.text}</p>
                </div>
              ))}
            </div>
            <div ref={msgEnd}></div>
          </div>
          <div className="chatFooter">
            <div className="inp">
              <input
                type="text"
                placeholder="Send a message"
                value={input}
                onKeyDown={handleEnter}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className="send" onClick={handleSend}>
                <img src={sendBtn} alt="" />
              </button>
            </div>
            <p> QNA.AI may produce inaccurate information</p>
          </div>
        </div>
      </div>
    </div>
  );

};

// Export the Bot component
export default Bot;