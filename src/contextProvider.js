import React, { useEffect, useState } from "react";
import { AuthContext } from "./context";
import { auth } from "./firebase";
const ContextProvider = ({ children }) => {
  // const [user, setUser] = useState(false)
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {});
  //   if (user) {
  //     setUser(true);
  //   }
  // }, [user]);
  console.log(user);
  return <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>{children}</AuthContext.Provider>;
};

export default ContextProvider;
