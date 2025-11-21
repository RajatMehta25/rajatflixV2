// contextProvider.js
import React, { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./context"; // your existing context object
import { auth } from "./firebase"; // firebase auth instance

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user object or null
  const [authResolved, setAuthResolved] = useState(false); // initial firebase check done
  const [loading, setLoading] = useState(false); // optional global loading flag

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      // avoid unnecessary re-sets if same user
      setUser((prev) => (prev?.uid === firebaseUser?.uid ? prev : firebaseUser || null));
      setAuthResolved(true);
    });
    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, setUser, authResolved, loading, setLoading }), [user, authResolved, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default ContextProvider;
