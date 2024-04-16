import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const UserInfoContext = createContext();

export const UserInfoContextProvider = ({ children }) => {
  const [user_id, setUser_id] = useState(localStorage.getItem('user_id') || "");
  const [display_name, setDisplay_name] = useState(localStorage.getItem('display_name') || "");

  useEffect(() => {
    localStorage.setItem('user_id', user_id);
  }, [user_id]);

  useEffect(() => {
    localStorage.setItem('display_name', display_name);
  }, [display_name]);

  return (
    <UserInfoContext.Provider value={{ user_id, setUser_id, display_name, setDisplay_name }}>
      {children}
    </UserInfoContext.Provider>
  );
};

UserInfoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};