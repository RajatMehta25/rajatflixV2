import { useEffect } from "react";

const useHandleDivWheel = (incomingRef) => {
  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (incomingRef.current) {
        incomingRef.current.scrollLeft += event.deltaY;
      }
    };

    const element = incomingRef.current;
    if (!element) return; // guard clause

    element.addEventListener("wheel", handleWheel);

    // cleanup on unmount
    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [incomingRef]);
};

export default useHandleDivWheel;
