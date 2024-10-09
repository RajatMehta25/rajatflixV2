import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import MoviesBox from "./MoviesBox";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "./context";
import { ScaleLoader } from "react-spinners";

const Home = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
        setLoading(false);
      } else {
        console.log("User not logged in");
      }
    });
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(false);

      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <div style={{ display: "flex", width: "100vw", height: "100vh", alignItems: "center", justifyContent: "center" }}>
          <ScaleLoader color="#db0000" />
        </div>
      ) : (
        <>
          <Header userDetails={userDetails} handleLogout={handleLogout} />
          <MoviesBox />
        </>
      )}
    </div>
  );
};

export default Home;
