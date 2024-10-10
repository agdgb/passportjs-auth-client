import React, { useEffect, useState } from "react";
import api from "../services/api"; // Adjust this import according to your API service setup
import { Table, Button } from "antd";
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/users");
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleEditUser = (userId) => {
    console.log(userId);
    navigate(`/users/edit/${userId}`);
  };

  const handleDeleteUser = (userId) => {
    navigate(`/users/delete/${userId}`);
  };

  const handleUserDetails = (userId) => {
    navigate(`/users/details/${userId}`);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, user) => (
        <div>
          <Button
            icon={<PencilSquareIcon className="h-5 w-5" />}
            onClick={() => handleEditUser(user._id)}
            type="link"
            style={{ color: "#1890ff" }}
          />
          <Button
            icon={<TrashIcon className="h-5 w-5" />}
            onClick={() => handleDeleteUser(user._id)}
            type="link"
            style={{ color: "#ff4d4f" }}
          />
          <Button
            icon={<ArrowDownCircleIcon className="h-5 w-5" />}
            onClick={() => handleUserDetails(user._id)}
            type="link"
            style={{ color: "#1890ff" }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={true}
      />
    </div>
  );
};

export default UserList;
