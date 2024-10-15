import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";
import RoleList from "../components/RoleList";
import { useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const EditUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [message, setMessage] = useState(null);
  const [statusCode, setStatusCode] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/users/${id}`);
        setUser(response.data);
        setSelectedRoles(response.data.roles);
        reset(response.data);
        setLoading(false);
      } catch (error) {
        setMessage("An error occurred while getting the user.");
        setStatusCode(error.response ? error.response.status : 500);
      }
    };

    fetchUser();
  }, [id]);

  const handleRoleSelect = (roleName) => {
    if (selectedRoles.includes(roleName)) {
      setSelectedRoles((prev) => prev.filter((role) => role !== roleName));
    } else {
      setSelectedRoles((prev) => [...prev, roleName]);
    }
  };

  const onSubmit = async (formData) => {
    try {
      formData.roles = selectedRoles;
      const response = await api.put(`/api/users/${id}`, formData);
      setMessage("User updated successfully!");
      setStatusCode(response.status);
      toast.success("User updated successfully!");
    } catch (error) {
      toast.error(
        "Unable to process your request! Plese make sure you are connected."
      );
      setMessage("An error occurred while updating the user.");
      setStatusCode(error.response ? error.response.status : 500);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <LoadingSpinner
        loading={loading}
        message="Fetching data, please wait..."
      />
    );
  }

  return (
    <>
      <div className="p-8">
        <div className="pb-4 max-w-4xl mx-auto">
          <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
            Edit User
          </h2>
          {message && (
            <p
              className={`font-semibold ${
                statusCode === 200 ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-700">
                Username
              </label>re
              <input
                {...register("username", { required: "Username is required" })}
                type="text"
                className="block w-full max-w-xs rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm"
              />
              {errors.username && (
                <span className="text-red-600 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-700">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                type="text"
                className="block w-full max-w-xs rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm"
              />
              {errors.firstName && (
                <span className="text-red-600 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-700">
                Last Name
              </label>
              <input
                {...register("lastName", { required: "Last name is required" })}
                type="text"
                className="block w-full max-w-xs rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm"
              />
              {errors.lastName && (
                <span className="text-red-600 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-700">
                Grandfather Name
              </label>
              <input
                {...register("grandFatherName", {
                  required: "Grandfather name is required",
                })}
                type="text"
                className="block w-full max-w-xs rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm"
              />
              {errors.grandFatherName && (
                <span className="text-red-600 text-sm">
                  {errors.grandFatherName.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-700">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="block w-full max-w-xs rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-700">
                Phone
              </label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                type="tel"
                className="block w-full max-w-xs rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm"
              />
              {errors.phone && (
                <span className="text-red-600 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-700">
                <input
                  {...register("status")}
                  type="checkbox"
                  className="mr-2"
                />
                Active
              </label>
            </div>

            <div className="col-span-2">
              <RoleList
                selectedRoles={selectedRoles}
                onRoleSelect={handleRoleSelect}
              />
            </div>

            <div className="col-span-2 flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
              >
                Update User
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
