import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import MoviesBox from "./MoviesBox";
import { auth, db, onMessageListener, requestForToken } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "./context";
import { ScaleLoader } from "react-spinners";
import { toast, Zoom } from "react-toastify";
import moment from "moment";
import { getToken, onMessage, getMessaging } from "firebase/messaging";
import { messaging } from "./firebase";

const Message = ({ image, title, body }) => {
  return (
    <>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {image ? <img src={image} style={{ width: "100px", height: "100px", borderRadius: "1rem" }} /> : false}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ fontSize: "1.5rem" }}>{title}</div>
          <div>{body}</div>
        </div>
      </div>
    </>
  );
};
const Home = () => {
  // const VAPID_KEY = process.env.REACT_APP_VAPID_KEY;

  // onMessageListener()
  //   .then((payload) => {
  //     toast.info(`${payload?.notification?.title}`, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //       transition: Zoom,
  //     });
  //   })
  //   .catch((err) => console.log("failed: ", err));

  //
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});
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
    console.log(moment().isAfter(moment(expiryTime)));
    return !moment().isAfter(moment(expiryTime));
  };
  // firebase
  async function requestPermission() {
    // const permission = await Notification.requestPermission();

    // if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_VAPID_KEY,
    });
    console.log("Token generated : ", token);
    if (Object.keys(userDetails).length > 0 && token) {
      await setDoc(doc(db, "PUSH", userDetails?.email), {
        PushToken: token,
        userAgent: window.navigator.userAgent,
      });
      //   // }
      // } else if (permission === "denied") {
      //   alert("You denied for the notification");
      // }
    }
  }

  useEffect(() => {
    requestPermission();
    // requestForToken();
  }, [userDetails]);
  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      const display = (
        <span>
          {payload?.notification?.title}
          <br />
          {payload?.notification?.body}
        </span>
      );
      //   toast.info(display, {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark",
      //     transition: Zoom,
      //   });
      // });
      toast(
        <Message image={payload.notification.image} title={payload.notification.title} body={payload.notification.body} />,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        }
      );
    });
  }, [messaging, onMessage]);

  const showNoti = () => {
    const t = "hello";
    toast.info(`${t}`, {
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
          {/* <button onClick={() => showNoti()}>Click Me</button> */}
          {userDetails?.paidUser && checkExpiryTime(userDetails?.expiryTime) ? (
            <MoviesBox />
          ) : (
            <div style={{ textAlign: "center", padding: "1rem", fontSize: "1.5rem" }}>
              Send 1 plate MOMO/DIMSUM MONEY ₹60 to UPI ID : rjt25881-1@okaxis and Whatsapp the Screenshot with your EMAIL ID to
              :<a href="https://wa.me/916372773008">+91-6372773008</a>
              &nbsp; to activate Subscription for 1 Month.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
