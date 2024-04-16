// THIS IS THE LANDING PAGE OF THE APPLICATION AFTER THE USER LOGS IN

// Import the React and ReactDOM libraries
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Import the cross icon
import Cross from "../assets/close.png";

// Import the stlyes
import "../styles/main.css";

// Import the axios
import axios from "axios";

// Import the firebase authentication
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";

// Import the react-hot-toast
import toast from "react-hot-toast";

// Import the UserInfoContext
import { UserInfoContext } from "../context/UserInfoContext";

// Import the useSelector and useDispatch hooks from react-redux
import { useDispatch } from "react-redux";

// Import the setFileNames action creator
import { setFileNames } from "../store";

// Create the Main component for this page

const Main = () => {

  // State for storing the uploaded files
  const [files, setFiles] = useState([]);

  // State for storing the bot name
  const [bot_name, setBotName] = useState("");

  // State for checking if the Next button is clicked
  const [isNextClicked, setIsNextClicked] = useState(false);

  // Reference to the file input element
  const inputRef = useRef();

  // create a navigate object
  const navigate = useNavigate();

  // Get the display name from the context
  const { display_name } = React.useContext(UserInfoContext);

  // Handler for drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handler for logout event

  const logout = async () => {

    // Get the current user
    const auth = getAuth();

    // Sign out the user
    signOut(auth).then(() => {
      toast.success('Logged out successfully');
      navigate('/login'); 
    }).catch((error) => {
      toast.error('Error logging out: ', error);
    });

  };

  // Handler for drop event

  const handleDrop = (e) => {

    // Prevent the default behavior
    e.preventDefault();

    // Get the dropped files
    const droppedFiles = Array.from(e.dataTransfer.files);

    // Filter the dropped files based on their file extensions
    const allowedExtensions = [".pdf", ".jpeg", ".jpg", ".png", ".bmp", ".docx", ".pptx", ".xlsx"];
    const filteredFiles = droppedFiles.filter((file) =>
      allowedExtensions.includes(file.name.substring(file.name.lastIndexOf(".")))
    );

    // Filter the selected files based on their same names
    const finalFiles = filteredFiles.filter((file) => !files.map((f) => f.name).includes(file.name));

    // Check if any files were filtered out
    if (finalFiles.length !== droppedFiles.length) {
      toast.error("Invalid file format or file with same name already exists.");
      return;
    }

    // Check if the totaal number of files is less than or equal to 10
    if (files.length + finalFiles.length > 10) {
      toast.error("Maximum number of files allowed is 10");
      return;
    }

    // Calculate the total size of the filtered files
    const totalSize = filteredFiles.reduce((total, file) => total + file.size, 0) / (1024 * 1024);

    // Check if total file size is less than or equal to 10 MB
    if (totalSize <= 10) {
      setFiles(filteredFiles);
    } 
    
    // Show error toast if total file size exceeds 10MB
    else {
      toast.error("Total file size exceeds 10MB");
    }

  };

  // Handler for delete file event
  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // Handler for add more files event

  const handleAddMoreFiles = (e) => {

    // Get the selected files
    let selectedFiles = [];

    try {
      selectedFiles = Array.from(e.target.files);
    }
    catch (error) {
      selectedFiles = Array.from(e.target.files).slice(0, 6);
    }

    // Filter the dropped files based on their file extensions
    const allowedExtensions = [".pdf", ".jpeg", ".jpg", ".png", ".bmp", ".docx", ".pptx", ".xlsx"];
    const filteredFiles = selectedFiles.filter((file) =>
      allowedExtensions.includes(file.name.substring(file.name.lastIndexOf(".")))
    );

    // Filter the selected files based on their same names
    const finalFiles = filteredFiles.filter((file) => !files.map((f) => f.name).includes(file.name));

    // Check if any files were filtered out
    if (finalFiles.length !== selectedFiles.length) {
      toast.error("Invalid file format or file with same name already exists");
      return;
    }

    // Check if the total number of files is less than or equal to 10
    if (files.length + finalFiles.length > 10) {
      toast.error("Maximum number of files allowed is 10");
      return;
    }

    // Calculate the total size of the selected files
    const totalSize = selectedFiles.reduce((total, file) => total + file.size, 0) / (1024 * 1024);

    // Check if total file size is less than or equal to 10MB
    if ( totalSize + files.reduce((total, file) => total + file.size, 0) / (1024 * 1024) <= 10 ) {
      setFiles([...files, ...selectedFiles]);
    } 
    
    else {
      // Show error toast if total file size exceeds 10MB
      toast.error("Total file size exceeds 10MB");
    }

  };

  // Get the dispatch function from the useDispatch hook
  const dispatch = useDispatch();

  // Handler for upload event

  const handleUpload = async () => {

    // Get the current user
    const auth = getAuth();
    const user = auth.currentUser;

    // Check if bot name is provided
    if (!bot_name) {
      toast.error("Please enter a bot name");
      return;
    }

    // Check if the bot name contains anything other than alphabets and numbers
    if (!/^[A-Za-z0-9]+$/.test(bot_name)) {
      toast.error("Bot name should contain only alphabets and numbers");
      return;
    }

    // Check if user is signed in
    if (!user) {
      toast.error("Please sign in to upload files");
      return;
    }

    // Dispatch the SET_BOT_NAME action
    dispatch({ type: "SET_BOT_NAME", payload: bot_name });

    // Now we can upload the data to the server

    // Make the API call to check if the bot name is available
    const botReadyResponse = await axios.get(`http://localhost:3001/api/botname?user_id=${user.uid}&bot_name=${bot_name}`);

    // Check if the bot name is available

    console.log(botReadyResponse);

    if (botReadyResponse.status === 200) {

      // Create a new FormData object for the analyze API
      const fdOfAnalyze = new FormData();

      // Get the file names from the files array
      const fileNames = files.map((file) => file.name);

      // Dispatch the SET_FILE_NAMES action
      dispatch(setFileNames(fileNames));

      // Append the user id, bot name, file names and file streams to the FormData object
      fdOfAnalyze.append("user_id", user.uid);
      fdOfAnalyze.append("bot_name", bot_name);
      fileNames.forEach((fileName, index) => { fdOfAnalyze.append(`file_names[${index}]`, fileName); });
      files.forEach((file) => fdOfAnalyze.append("file_streams", file));

      // Make the API call to train the bot

      await toast.promise(
        axios.post("http://localhost:3001/api/analyze", fdOfAnalyze),
        {
          loading: "Uploading Files and Building the Bot ... (This may take a while)",
          success: () => {
            setFiles([]);
            setBotName("");
            setIsNextClicked(false);
            return "Bot is ready to use";
          },
          error: (err) => { return "Error building bot: " + err.message }
        },
        {
          style: { minWidth: "250px" }
        }
      );

      // Navigate to the bot chat page
      navigate("/bot-chat");

    }

    else {
      // Show error toast if bot name is already taken
      setBotName("");
      toast.error("Bot name is already taken, Please enter a different bot name");
    }

  };

  // Render the component

  return (
    <div className="main-container">
      <div className="left-section">
        <div className="logo-section">
          <div className="logo-main">QnA.AI</div>
        </div>
        <div className="left-instructions">
          <h1>Instructions</h1>
          <ul>
            <li>Upload (or drag and drop) the files to get started</li>
            <li>Supported files: .pdf, .jpeg, .png, .bmp, .docx, .pptx, .xlsx</li>
            <li>Maximum allowed size of a individual file: 10MB</li>
            <li>Maximum number of files allowed: 10</li>
          </ul>
          <p>
            <Link to="/Prev-Chats">
              <span>Previous Chats <br/> </span>
            </Link>
            <br/>
            <Link to="#" onClick={logout}>
              <span>LogOut </span>
            </Link>
          </p>
        </div>
        <div className="profile-menu">
          <div className="profile-name">
            {display_name || "Guest"}
            <span> :) </span>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="blob"></div>
        <div className="input-field">
          {files.length > 0 ? (
            <div className="uploads">
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    {file.name}
                    <img
                      src={Cross}
                      onClick={() => handleDeleteFile(index)}
                      alt="cross-icon"
                      className="cross-icon"
                    />
                  </li>
                ))}
              </ul>
              <div className="actions">
                <button onClick={() => setFiles([])}>Cancel</button>
                {isNextClicked ? (
                  <div className="bot-name">
                    <input
                      type="text"
                      value={bot_name}
                      onChange={(e) => setBotName(e.target.value)}
                      placeholder="Enter bot name"
                    />
                    <button onClick={handleUpload}>Upload</button>
                  </div>
                ) : (
                  // Next button
                    <React.Fragment>
                      <input
                        type="file"
                        ref={inputRef}
                        multiple
                        style={{ display: "none" }}
                        onChange={handleAddMoreFiles} // Add this line
                      />
                      <button
                        onClick={() =>
                          inputRef.current && inputRef.current.click()
                        }
                      >
                        Add more
                      </button>{" "}
                      <button onClick={() => setIsNextClicked(true)}>Next</button>
                    </React.Fragment>
                )}
              </div>
            </div>
          ) : (
            <div
              className="drop-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <h1>Drag and Drop files to upload</h1>
              <p>or</p>
              <input
                type="file"
                multiple
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleAddMoreFiles}
              />
              <button onClick={() => inputRef.current.click()}>
                Select Files
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export the Main component
export default Main;