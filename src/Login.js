import React, { useContext } from "react";
import { auth, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "../src/context";
const Login = () => {
  const { user, setUser } = useContext(AuthContext);

  const google = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        });
      }
      // localStorage.setItem("user", true);
      setUser(true);
      window.location.href = "/Home";
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
