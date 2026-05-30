import React, { useEffect, useState } from "react";

const UserCount = () => {
  const [count, setCount] = useState(Math.floor(Math.random() * (10000 - 7000 + 1)) + 50000);
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(Math.floor(Math.random() * (1000000 - 7000 + 1)) + 7000);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ fontSize: "1.5rem", fontFamily: "monospace", textAlign: "center" }}>
      WorldWide Active User Count :{" "}
      <span style={{ color: "#db0000" }} className="blinking-text">
        {count}
      </span>
    </div>
  );
};

export default UserCount;
