// Login.js (only key parts shown)
import React, { useContext } from "react";
import { auth, db } from "./firebase"; // browserLocalPersistence is one of the options
import { GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "./context";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, Zoom } from "react-toastify"; // Ensure this import is here
import { format, addMonths, subDays } from "date-fns";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setLoading } = useContext(AuthContext) || {};
  const now = new Date();

  const google = async () => {
    setLoading?.(true);
    const provider = new GoogleAuthProvider();
    try {
      // 1. Set the persistence
      await setPersistence(auth, browserLocalPersistence);
      // 2. Then, sign in
      const result = await signInWithPopup(auth, provider); // This will now use the persistence you just set
      const user = result.user;

      // store/update user doc in Firestore...
      const userDocRef = doc(db, "Users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          _tokenResponse: result._tokenResponse || null,
          paidUser: true,
          paidON: format(now, "dd-MM-yyyy HH:mm:ss a"),
          expiryTime: format(subDays(addMonths(now, 1), 1), "dd-MM-yyyy"),
          lastLogin: format(now, "dd-MM-yyyy HH:mm:ss a"),
          firstLogin: format(now, "dd-MM-yyyy HH:mm:ss a"),
        });
      } else {
        await updateDoc(userDocRef, {
          _tokenResponse: result._tokenResponse || null,
          lastLogin: format(now, "dd-MM-yyyy HH:mm:ss a"),
        });
      }

      // set real user object (not boolean)
      setUser(user);
      setLoading?.(false);

      // navigate to original requested page or home
      const from = location.state?.from?.pathname || "/home";
      navigate(from, { replace: true });

      toast.success("Logged In Successfully!", { transition: Zoom, theme: "dark" });
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
