import React, { useState } from "react";
import api from "../services/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const [errorDetails, setErrorDetails] = useState(null);
  const [message, setMessage] = useState(null);
  const [statusCode, setStatusCode] = useState(0);

  const onSubmit = async (data) => {
    try {
      console.log("USER DATA:", data);
      const res = await api.put(`/api/users/changepassword`, data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error updating profile", error?.message);
    }
  };

  return (
    <div className="p-8">
      <div className="pb-4 max-w-4xl">
        <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
          Change Password
        </h2>
        {message && (
          <>
            <p
              className={`${
                statusCode === 201 ? "text-green-700" : "text-red-700"
              } font-semibold`}
            >
              {message}
            </p>
            <span className="text-red-600 text-sm">{errorDetails}</span>
          </>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="p-1 sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Current Password
            </label>
            <input
              {...register("currentPassword", {
                required: "Current Password is required",
              })}
              type="password"
              className="block w-full max-w-xs rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm"
            />
            {errors.currentPassword && (
              <span className="text-red-600 text-sm">
                {errors.currentPassword?.message}
              </span>
            )}
          </div>

          <div className="p-1 sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              New Password
            </label>
            <input
              {...register("password", { required: "Password is required." })}
              type="password"
              className="block w-full max-w-xs rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm"
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="p-1 sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              className="block w-full max-w-xs rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm"
            />
            {errors.confirmPassword && (
              <span className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="mt-4 flex gap-2 max-w-80">
            <button
              type="submit"
              className="col-span-1 block max-w-xs w-full rounded-md border-0 p-1.5 text-white bg-blue-600 hover:bg-blue-900 transition-all ease-in-out duration-300"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="block max-w-xs w-full rounded-md border-0 p-1.5 text-white bg-red-600 hover:bg-red-900 transition-all ease-in-out duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
