// contextProvider.js
import React, { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./context";
import { auth } from "./firebase"; // firebase auth instance
import LoadingCard from "./LoadingCard";
import { getAnalytics, setUserId } from "firebase/analytics";
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // store user object or null
  const [authResolved, setAuthResolved] = useState(false); // initial firebase check done
  const [loading, setLoading] = useState(false); // optional global loading flag
  const analytics = getAnalytics();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser((prev) => (prev?.uid === firebaseUser?.uid ? prev : firebaseUser || null));

      setAuthResolved(true);
      if (firebaseUser) {
        setUserId(analytics, firebaseUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ user, setUser, authResolved, loading, setLoading }), [user, authResolved, loading]);
  if (!authResolved) return <LoadingCard />;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default ContextProvider;
