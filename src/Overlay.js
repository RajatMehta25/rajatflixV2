import React from "react";

const Overlay = ({ channel }) => {
  const [showOverlay, setShowOverlay] = React.useState(true);
  React.useEffect(() => {
    // 1. Open the modal when triggerProp changes (and is truthy)
    if (channel) {
      setShowOverlay(true);
    }
    // 2. Set a timer to close it after 2 seconds
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 2000);

    // 3. Clean up the timer if the prop changes again quickly
    return () => clearTimeout(timer);
  }, [channel]);

  return (
    <div>
      {showOverlay && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <h1 style={{ color: "white", fontSize: "2rem" }}>Welcome to Rajatflix | Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Overlay;
