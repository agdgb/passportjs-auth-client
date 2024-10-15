import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/api/users/login", {
        username,
        password,
      });
      const { token, refreshToken, currentUser } = response.data;

      login(token, refreshToken, currentUser);

      navigate("/");
    } catch (err) {
      setError("Invalid credentials, please try again.", err);
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex flex-col items-center justify-center ">
      <h1 className="m-6 text-white text-4xl">Login</h1>
      <form className="flex flex-col gap-2" onSubmit={handleLogin}>
        {error && <p className="error-message text-red-700">{error}</p>}
        <div className="flex flex-col gap-2">
          <label className="text-lg xl:text-2xl text-white" htmlFor="username">
            Username
          </label>
          <input
            type="username"
            id="username"
            value={username}
            className="rounded p-1 text-lg xl:p-2 xl:text-2xl xl:rounded-xl"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg xl:text-2xl text-white" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="rounded p-1 text-lg xl:p-2 xl:text-2xl xl:rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="py-1 xl:text-2xl xl:px-6 xl:py-2 xl:rounded-xl bg-blue-600 hover:bg-blue-800 border-slate-400 px-2 mt-2 text-2xl text-white rounded"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
