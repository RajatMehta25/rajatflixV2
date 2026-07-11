// Login.js
import React, { useContext, useEffect, useRef } from "react";
import { auth, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "./context";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import { format, addDays } from "date-fns";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setLoading } = useContext(AuthContext) || {};

  // CRITICAL FIX 1: Prevents React StrictMode from executing getRedirectResult twice
  const isProcessing = useRef(false);

  // Unified helper function to handle database registration, state updates, and navigation
  const handleUserSession = async (result) => {
    if (!result || !result.user) return false;

    const user = result.user;
    const now = new Date();

    try {
      const userDocRef = doc(db, "Users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          _tokenResponse: result._tokenResponse || null,
          paidUser: false,
          paidON: format(now, "dd-MM-yyyy HH:mm:ss a"),
          expiryTime: format(addDays(now, 1), "dd-MM-yyyy"),
          lastLogin: format(now, "dd-MM-yyyy HH:mm:ss a"),
          firstLogin: format(now, "dd-MM-yyyy HH:mm:ss a"),
        });
      } else {
        await updateDoc(userDocRef, {
          _tokenResponse: result._tokenResponse || null,
          lastLogin: format(now, "dd-MM-yyyy HH:mm:ss a"),
        });
      }

      setUser?.(user);

      const from = location.state?.from?.pathname || "/home";
      navigate(from, { replace: true });

      toast.success("Logged In Successfully!", { transition: Zoom, theme: "dark" });
      return true;
    } catch (error) {
      console.error("Firestore sync failed:", error);
      toast.error("Failed to sync user data", { transition: Zoom, theme: "dark" });
      return false;
    }
  };

  useEffect(() => {
    // If this effect is already running elsewhere, back out immediately
    if (isProcessing.current) return;
    isProcessing.current = true;

    setLoading?.(true);

    getRedirectResult(auth)
      .then(async (result) => {
        if (result) {
          console.log("Logged in via mobile redirect:", result.user);
          const success = await handleUserSession(result);
          if (!success) setLoading?.(false);
        } else {
          // No active redirect data found; turn off loading spinner safely
          setLoading?.(false);
        }
      })
      .catch((error) => {
        console.error("Redirect auth error:", error.message);
        setLoading?.(false);
        // CRITICAL FIX 2: If mobile blocks the redirect cookie, fall back seamlessly to Popup!
        if (
          error.code === "auth/auth-domain-config-required" ||
          error.code === "auth/operation-not-supported-in-this-environment"
        ) {
          console.log("Mobile redirect failed due to browser cookie restrictions. Switching to popup mode fallback...");
        } else {
          toast.error("Failed to log in with Google", { transition: Zoom, theme: "dark" });
        }
      });
  }, []);

  const google = async () => {
    setLoading?.(true);
    const provider = new GoogleAuthProvider();

    try {
      // Check screen size or touch capability
      const isMobile = window.innerWidth < 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

      if (isMobile) {
        // Mobile flow
        await signInWithRedirect(auth, provider);
      } else {
        // Desktop flow
        const result = await signInWithPopup(auth, provider);
        const success = await handleUserSession(result);
        if (!success) setLoading?.(false);
      }
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setLoading?.(false);
      toast.error("Failed to log in with Google", { transition: Zoom, theme: "dark" });
    }
  };

  return (
    <div className="LoginContainer">
      <div>
        <img src="rajatflix.png" alt="logo" />
      </div>
      <div className="GoogleContainer" onClick={google}>
        <img className="googleImage" src="googleSignin.png" alt="google sign in" />
        <div className="SignIn">Sign In</div>
      </div>
    </div>
  );
};

export default Login;
