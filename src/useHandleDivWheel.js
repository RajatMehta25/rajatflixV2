import React, { useEffect } from "react";

const useHandleDivWheel = (event, incomingRef) => {
  useEffect(() => {
    incomingRef?.current.addEventListener("wheel", handleWheel);
  }, []);
  const handleWheel = () => {
    event.preventDefault();

    incomingRef.current.scrollLeft += event.deltaY;
  };
  return <div>useHandleDivWheel</div>;
};

export default useHandleDivWheel;
