import React, { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const ff = async () => {
      const res = await api.get("/api/users/user");
      setResponse(res.data);
    };

    ff();
  }, []);

  const accessAdmin = async () => {
    const res = await api.get("/api/users/admin", {
      token: localStorage.getItem("refreshToken"),
    });
    setResponse(res.data);
  };
  const accessUser = async () => {
    const res = await api.get("/api/users/user");
    setResponse(res.data);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <p>Endpoint Accessed: {response.message}</p>
        <button onClick={accessUser}>User</button> &nbsp;
        <button onClick={accessAdmin}>Admin</button> &nbsp;
      </div>
    </div>
  );
};

export default Dashboard;
