import React, { useEffect, useState } from "react";
import { AuthContext } from "./context";
const ContextProvider = ({ children }) => {
  // const [user, setUser] = useState(false)
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("user")));
  // }, [user]);
  console.log(user);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default ContextProvider;
