import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Table, Button } from "antd";
import Modal from "react-modal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { EyeIcon } from "@heroicons/react/24/outline";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const closeModal = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      await api.put(`/api/users/delete/${userToDelete._id}`, {
        status: false,
      });
      toast.success("User deleted successfully");
      setUsers(users.filter((user) => user._id !== userToDelete._id));
      closeModal();
    } catch (error) {
      toast.error("Error deleting user");
      console.error(error);
    }
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleEditUser = (userId) => {
    navigate(`/users/edit/${userId}`);
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
        <div className="flex space-x-2">
          <div className="relative group">
            <Button
              icon={<EyeIcon className="h-5 w-5" />}
              onClick={() => handleUserDetails(user._id)}
              type="link"
              style={{ color: "#1890ff" }}
            />
            <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded">
              View
            </div>
          </div>

          <div className="relative group">
            <Button
              icon={<PencilSquareIcon className="h-5 w-5" />}
              onClick={() => handleEditUser(user._id)}
              type="link"
              style={{ color: "#1890ff" }}
            />
            <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded">
              Edit
            </div>
          </div>

          <div className="relative group">
            <Button
              icon={<TrashIcon className="h-5 w-5" />}
              onClick={() => openDeleteModal(user)}
              type="link"
              style={{ color: "#ff4d4f" }}
            />
            <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded">
              Delete
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
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

      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        className="fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-800"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full mx-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Confirm Deletion
          </h2>
          <p className="mt-4 text-gray-600">
            Are you sure you want to delete user{" "}
            <b>
              {userToDelete?.firstName} {userToDelete?.lastName}
            </b>
            ?
          </p>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserList;
