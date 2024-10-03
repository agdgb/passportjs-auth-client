import React, { useEffect, useState } from "react";
import api from "../services/api";
import BarChart from "../charts/BarChart";
import CalendarChart from "../charts/CalendarChar";

const Dashboard = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const ff = async () => {
      const res = await api.get("/api/users/user");
      setResponse(res.data);
    };

    ff();
  }, []);

  const barData = [
    {
      country: "AD",
      "hot dog": 100,
    },
    {
      country: "AE",
      "hot dog": 80,
    },
  ];

  const pieData = [
    {
      id: "java",
      label: "java",
      value: 355,
    },
    {
      id: "python",
      label: "python",
      value: 220,
    },
  ];

  const lineData = [
    {
      id: "japan",
      data: [
        { x: "plane", y: 41 },
        { x: "helicopter", y: 75 },
      ],
    },
  ];

  const calendarData = [
    {
      day: "2023-10-01",
      value: 100,
    },
    {
      day: "2023-10-02",
      value: 200,
    },
  ];

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
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Row 1 - Two charts, second one spans two columns */}
        <div className="col-span-1 bg-white shadow-md rounded-lg p-6">
          {/* Chart 1 */}
          <BarChart />
        </div>
        <div className="col-span-1 lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          {/* Chart 2 */}
          <CalendarChart />
        </div>

        {/* Row 2 - Reverse of first row */}
        <div className="col-span-1 lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          {/* Chart 3 */}
          <BarChart />
        </div>
        <div className="col-span-1 bg-white shadow-md rounded-lg p-6">
          {/* Chart 4 */}
          <BarChart />
        </div>

        {/* Row 3 - Three equal columns */}
        <div className="col-span-1 bg-white shadow-md rounded-lg p-6">
          {/* Chart 5 */}
          <BarChart />
        </div>
        <div className="col-span-1 bg-white shadow-md rounded-lg p-6">
          {/* Chart 6 */}
          <BarChart />
        </div>
        <div className="col-span-1 bg-white shadow-md rounded-lg p-6">
          {/* Chart 7 */}
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
