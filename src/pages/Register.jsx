import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";
import RoleList from "../components/RoleList";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      grandFatherName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      status: true,
      roles: [],
    },
  });

  const password = watch("password");
  const [message, setMessage] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  const [statusCode, setStatusCode] = useState(0);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handleRoleSelect = (roleName) => {
    if (selectedRoles.includes(roleName)) {
      setSelectedRoles((prev) => prev.filter((role) => role !== roleName));
    } else {
      setSelectedRoles((prev) => [...prev, roleName]);
    }
  };
  const onSubmit = async (formData) => {
    try {
      const res = await api.post("/api/users/register", formData);
      setMessage(res.data.message);
      setStatusCode(res.status);
      setSelectedRoles([]);
      reset();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
        setErrorDetails(error.response.data.details);
        setStatusCode(error.response.status);
      } else {
        setMessage("An unexpected error occurred");
        setStatusCode(500);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="pb-4 max-w-4xl mx-auto">
        <h2 className="mb-4 text-base font-semibold leading-7 text-gray-900">
          Personal Information
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-x-6 sm:grid-cols-4"
        >
          <div className="p-1 sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
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

          <div className="p-1 sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              First Name
            </label>
            <input
              {...register("firstName", {
                required: "First Name is required",
                maxLength: {
                  value: 130,
                  message: "First Name must be at most 30 characters long",
                },
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

          <div className="p-1 sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <input
              {...register("lastName", {
                required: "Last Name is required",
                maxLength: {
                  value: 130,
                  message: "Last Name must be at most 30 characters long",
                },
              })}
              type="text"
              className="block w-full max-w-xs rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm"
            />
            {errors.lastName && (
              <span className="text-red-600 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="p-1 sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              G.Father Name
            </label>
            <input
              {...register("grandFatherName", {
                maxLength: {
                  value: 130,
                  message:
                    "Grandfather Name must be at most 30 characters long",
                },
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

          <div className="p-1 sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
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

          <div className="p-1 sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Phone
            </label>
            <input
              {...register("phone", {
                maxLength: {
                  value: 130,
                  message: "Phone number must be at most 13 characters long",
                },
              })}
              type="tel"
              className="block w-full max-w-xs rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-inset focus:ring-gray-800 sm:text-sm"
            />
            {errors.phone && (
              <span className="text-red-600 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="p-1 sm:col-span-2">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
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

          <div className="p-1 sm:col-span-2">
            <label className="block leading-6">&nbsp;</label>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              <input {...register("status")} type="checkbox" className="mr-2" />
              &nbsp; Active
            </label>
          </div>
          <div className="p-1 sm:col-span-2"></div>
          <div className="p-1 sm:col-span-4">
            <RoleList
              onRoleSelect={handleRoleSelect}
              selectedRoles={selectedRoles}
            />
          </div>

          <div className="p-1 sm:col-span-2"></div>
          <div className="flex gap-2 sm:col-span-1">
            <button
              type="submit"
              className="block max-w-xs w-full rounded-md border-0 p-1.5 text-white bg-blue-600 hover:bg-blue-900 transition-all ease-in-out duration-300"
            >
              Save
            </button>
            {/* <button
              type="submit"
              onClick={log}
              className="block max-w-xs w-full rounded-md border-0 p-1.5 text-white bg-blue-600 hover:bg-blue-900 transition-all ease-in-out duration-300"
            >
              log
            </button> */}
            <button
              type="button"
              onClick={() => {
                reset();
                setSelectedRoles([]);
              }}
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

export default Register;
