import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className={`p-6 rounded-lg bg-blue-100 text-blue-800`}>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg mb-8">
          Sorry, the page you are looking for does not exist.
        </p>

        <div className="flex gap-1">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
