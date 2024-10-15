import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get("/api/users/profile");
        setUser(response.data);
        reset(response.data);
      } catch (error) {
        toast.error("Error fetching user profile");
      }
    };

    fetchUserProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const res = await api.put(`/api/users/profile`, data);
      toast.success("Profile updated successfully");
      setUser(data);
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  if (!user) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="max-w-lg p-8 bg-white rounded-lg">
      <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
        User Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            {...register("username", { required: "Username is required" })}
            readOnly="true"
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-100 ${
              errors.username ? "border-red-500" : ""
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            {...register("firstName", { required: "First name is required" })}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-100 ${
              errors.firstName ? "border-red-500" : ""
            }`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-100 ${
              errors.lastName ? "border-red-500" : ""
            }`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grandfather's Name
          </label>
          <input
            {...register("grandFatherName", {
              required: "Grandfather's name is required",
            })}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-100 ${
              errors.grandFatherName ? "border-red-500" : ""
            }`}
          />
          {errors.grandFatherName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.grandFatherName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email is not valid",
              },
            })}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-100 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            {...register("phone", { required: "Phone number is required" })}
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-100 ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-52 mt-4 bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition duration-300"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
