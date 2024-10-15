import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { AuthContext } from "../context/AuthContext";

const errorDetails = {
    404: {
        title: "Page Not Found",
        message: "Sorry, the page you are looking for does not exist.",
        color: "bg-blue-100 text-blue-800",
    },
    403: {
        title: "Access Forbidden",
        message: "You do not have permission to access this page.",
        color: "bg-red-100 text-red-800",
    },
    500: {
        title: "Internal Server Error",
        message: "Oops! Something went wrong on our side. Please try again later.",
        color: "bg-yellow-100 text-yellow-800",
    },
    401: {
        title: "Unauthorized",
        message: "Please log in to access this page.",
        color: "bg-green-100 text-green-800",
    },
    default: {
        title: "Error",
        message: "An unexpected error occurred. Please try again.",
        color: "bg-gray-100 text-gray-800",
    },
};

const ErrorPage = () =>
{
    const location = useLocation();
    const { logout } = useContext(AuthContext)
    const queryParams = queryString.parse(location.search);
    const errorCode = queryParams.code || "default";
    const navigate = useNavigate();
    const { title, message, color } = errorDetails[errorCode] || errorDetails.default;

    const handleGoBackHome = () =>
    {
        navigate(-1)
    };

    const handleLogout = () =>
    {
        logout();
        window.location.href = "/login";
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className={`p-6 rounded-lg ${color}`}>
                <h1 className="text-5xl font-bold mb-4">{errorCode}</h1>
                <h2 className="text-3xl font-semibold mb-4">{title}</h2>
                <p className="text-lg mb-8">{message}</p>

                <div className="flex gap-1">
                    <button
                        onClick={handleGoBackHome}
                        className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition duration-300"
                    >
                        Go Back Home
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-md transition duration-300"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
