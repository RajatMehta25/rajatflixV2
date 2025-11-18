import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingCard = () => {
  return (
    <SkeletonTheme baseColor="#fff" highlightColor="#db0000">
      <p style={{ width: "100%" }}>
        <Skeleton height={30} />
      </p>
    </SkeletonTheme>
  );
};

export default LoadingCard;
