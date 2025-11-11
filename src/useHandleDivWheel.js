import { useEffect } from "react";

const useHandleDivWheel = (event, incomingRef) => {
  useEffect(() => {
    incomingRef?.current.addEventListener("wheel", handleWheel);
  }, []);
  const handleWheel = () => {
    event.preventDefault();

    incomingRef.current.scrollLeft += event.deltaY;
  };
};

export default useHandleDivWheel;
