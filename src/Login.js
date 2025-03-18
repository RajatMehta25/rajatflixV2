import React, { useContext, useEffect } from "react";
import { auth, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../src/context";
import { useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import moment from "moment";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        setUser(true);
        // setLoading(true);
        navigate("/Home");
      } else {
      }
    });
  }, []);

  const { user, setUser, setLoading } = useContext(AuthContext);
  console.log(moment().add(1, "M").subtract(1, "day").format("DD-MM-YYYY"));
  //time and date of first login
  console.log(moment().format("DD-MM-YYYY HH:mm:ss A"));
  const google = async () => {
    // const provider = new GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    // signInWithPopup(auth, provider).then(async (result) => {
    //   console.log("google-->", result);
    //   const user = result.user;

    //   if (user) {
    //     await setDoc(doc(db, "Users", user.uid), {
    //       email: user.email,
    //       name: user.displayName,
    //       photo: user.photoURL,
    //       accessToken: user.accessToken,
    //       phoneNumber: user.phoneNumber,
    //       _tokenResponse: result._tokenResponse,
    //       paidUser: true,
    //       paidON: moment().format("DD-MM-YYYY"),
    //       expiryTime: moment().add(1, "M").subtract(1, "day").format("DD-MM-YYYY"),
    //     });
    //   }
    // localStorage.setItem("user", true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("google-->", result);
      const user = result.user;

      if (user) {
        const userDocRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // User does not exist, create a new document
          await setDoc(userDocRef, {
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
            accessToken: user.accessToken,
            phoneNumber: user.phoneNumber,
            _tokenResponse: result._tokenResponse,
            paidUser: true,
            paidON: moment().format("DD-MM-YYYY HH:mm:ss A"),
            expiryTime: moment().add(1, "M").subtract(1, "day").format("DD-MM-YYYY"),
            lastLogin: moment().format("DD-MM-YYYY HH:mm:ss A"),
            fistLogin: moment().format("DD-MM-YYYY HH:mm:ss A"),
          });
        } else {
          // User exists, update only necessary fields
          await updateDoc(userDocRef, {
            accessToken: user.accessToken,
            _tokenResponse: result._tokenResponse,
            lastLogin: moment().format("DD-MM-YYYY HH:mm:ss A"),
            // Add other fields that need to be updated on every login
          });
        }
      }
      setUser(true);
      setLoading(true);
      navigate("/Home");
      toast.success("Logged In Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error("Failed to log in with Google", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  return (
    <div className="LoginContainer">
      <div>
        <img src="rajatflix.png" />
      </div>
      <div className="GoogleContainer" onClick={() => google()}>
        <img className="googleImage" src="googleSignin.png" />
        <div className="SignIn">Sign In</div>
      </div>
    </div>
  );
};

export default Login;
