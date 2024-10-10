import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ loading, message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      {loading && (
        <>
          <ClipLoader color={"#123abc"} loading={loading} size={50} />
          <p className="mt-4">{message || "Loading..."}</p>{" "}
        </>
      )}
    </div>
  );
};

export default LoadingSpinner;
