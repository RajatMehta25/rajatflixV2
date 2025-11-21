// Home.js
import React, { useContext, useEffect, useState, useCallback } from "react";
import Header from "./Header";
import MoviesBox from "./MoviesBox";
import { auth, db, messaging } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "./context";
import { ScaleLoader } from "react-spinners";
import { toast, Zoom } from "react-toastify";
import { getToken, onMessage } from "firebase/messaging";
import { parse, isAfter } from "date-fns";
import Disclaimer from "./Disclaimer";
import { useNavigate } from "react-router-dom";

const Message = ({ image, title, body }) => (
  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
    {image ? <img src={image} style={{ width: 100, height: 100, borderRadius: 16 }} alt="" /> : null}
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ fontSize: "1.5rem" }}>{title}</div>
      <div>{body}</div>
    </div>
  </div>
);

const Home = () => {
  const { user, setUser, loading, setLoading, authResolved } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  // Fetch user details once we have an authenticated user
  const fetchUserData = useCallback(
    async (uid) => {
      if (!uid) return;
      try {
        setLoading?.(true);
        const docRef = doc(db, "Users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          setUserDetails({});
          console.warn("User document not found for uid:", uid);
        }
      } catch (err) {
        console.error("fetchUserData error:", err);
      } finally {
        setLoading?.(false);
      }
    },
    [setLoading]
  );

  // When auth is resolved and user exists, fetch user data.
  useEffect(() => {
    if (!authResolved) return; // wait for initial onAuthStateChanged in provider
    if (user?.uid) {
      fetchUserData(user.uid);
    } else {
      // If signed out, clear details
      setUserDetails({});
    }
  }, [authResolved, user, fetchUserData]);

  // Request / store FCM token once (only when userDetails change and token not present)
  useEffect(() => {
    const doRequestToken = async () => {
      if (!userDetails?.email) return;
      try {
        const token = await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });
        if (token) {
          // Save or update token doc (use merge behavior - here setDoc replaces; you can change to updateDoc)
          await setDoc(
            doc(db, "PUSH", userDetails.email),
            {
              PushToken: token,
              userAgent: window.navigator.userAgent,
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
          console.log("FCM token stored:", token);
        }
      } catch (err) {
        console.warn("FCM token error:", err);
      }
    };

    doRequestToken();
    // Only run when userDetails.email changes
  }, [userDetails?.email]);

  // Listen for incoming messages once
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("FCM payload:", payload);
      const { title, body, image } = payload.notification || {};
      toast(<Message image={image} title={title} body={body} />, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Zoom,
      });
    });

    // onMessage does not return an unsubscribe in some SDKs; if it does, cleanup here.
    // If it doesn't, there's no-op cleanup.
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []); // run once

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // set user to null (store user object or null)
      setUser?.(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // expiryTime format expected "dd-MM-yyyy" (no time). Adjust parse pattern accordingly.
  const checkExpiryTime = (expiryTimeStr) => {
    if (!expiryTimeStr) return false;
    try {
      const expiryDate = parse(expiryTimeStr, "dd-MM-yyyy", new Date());
      // if expiryDate is invalid, parse returns Invalid Date
      if (isNaN(expiryDate)) return false;
      return !isAfter(new Date(), expiryDate); // true if now <= expiryDate
    } catch (err) {
      console.error("Expiry parse error:", err);
      return false;
    }
  };

  // UI
  if (!authResolved || loading) {
    return (
      <div style={{ display: "flex", width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <ScaleLoader />
      </div>
    );
  }

  const hasAccess = userDetails?.paidUser && checkExpiryTime(userDetails?.expiryTime);

  return (
    <div>
      <Header userDetails={userDetails} handleLogout={handleLogout} />
      {hasAccess ? (
        <MoviesBox />
      ) : (
        <div style={{ textAlign: "center", padding: "1rem", fontSize: "1.25rem" }}>Free Trial is Over.</div>
      )}
      <Disclaimer />
    </div>
  );
};

export default Home;
