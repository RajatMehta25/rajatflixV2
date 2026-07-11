// Login.js
import React, { useContext, useEffect } from "react";
import { auth, db } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect, // Imported correct v9/v10 method
  getRedirectResult,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "./context";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import { format, addDays } from "date-fns";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setLoading } = useContext(AuthContext) || {};

  // Unified helper function to handle database registration, state updates, and navigation
  const handleUserSession = async (result) => {
    if (!result) return;

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

      // Set global user object and clear loading state
      setUser?.(user);
      setLoading?.(false);

      // Navigate to intended or default route
      const from = location.state?.from?.pathname || "/home";
      navigate(from, { replace: true });

      toast.success("Logged In Successfully!", { transition: Zoom, theme: "dark" });
    } catch (error) {
      console.error("Firestore sync failed:", error);
      setLoading?.(false);
      toast.error("Failed to sync user data", { transition: Zoom, theme: "dark" });
    }
  };

  useEffect(() => {
    // Listens for mobile users returning after their browser redirect completed
    setLoading?.(true);

    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log("Logged in via mobile redirect:", result.user);
          handleUserSession(result);
        } else {
          // Normal page boot; no pending authentication redirects found
          setLoading?.(false);
        }
      })
      .catch((error) => {
        console.error("Redirect auth error:", error.message);
        setLoading?.(false);
        toast.error("Failed to log in with Google", { transition: Zoom, theme: "dark" });
      });
  }, []);

  const google = async () => {
    setLoading?.(true);
    const provider = new GoogleAuthProvider();

    try {
      if (window.innerWidth < 768) {
        // Mobile flow: Redirects page away entirely. Rest of this function will not execute.
        await signInWithRedirect(auth, provider);
      } else {
        // Desktop flow: Processes everything inline via popup modal
        const result = await signInWithPopup(auth, provider);
        await handleUserSession(result);
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
