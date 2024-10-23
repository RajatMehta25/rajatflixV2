import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import MoviesBox from "./MoviesBox";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "./context";
import { ScaleLoader } from "react-spinners";
import { toast, Zoom } from "react-toastify";
import moment from "moment";

const Home = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    fetchUserData();
  }, [loading]);

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
  const checkExpiryTime = (expiryTime) => {
    if (moment().isAfter(moment(expiryTime))) {
      return false;
    } else {
      return true;
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
          {userDetails?.paidUser && checkExpiryTime(userDetails?.expiryTime) ? (
            <MoviesBox />
          ) : (
            <h1>
              Send ₹50 to UPI ID : rjt25881-1@okaxis <br /> and Whatsapp to :
              <a href="https://wa.me/916372773008">+91-6372773008</a> <br />
              to activate Subscription. <br />
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
