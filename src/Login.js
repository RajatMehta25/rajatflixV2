import React, { useContext } from "react";
import { auth, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../src/context";
import { useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";

const Login = () => {
  const { user, setUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const google = () => {
    const provider = new GoogleAuthProvider();
    // provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
          accessToken: user.accessToken,
          phoneNumber: user.phoneNumber,
          _tokenResponse: result._tokenResponse,
        });
      }
      // localStorage.setItem("user", true);

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
    });
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