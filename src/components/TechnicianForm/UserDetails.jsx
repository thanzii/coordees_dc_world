import React from "react";

export default function UserDetails({ register, errors }) {
  return (
    <div className="">
      <div className="flex justify-center w-full my-8 bg-gradient-to-br from-green-500 via-green-400 to-green-300 rounded-md p-1 text-white font-semibold">
        Personal Details
      </div>
      <div className="grid gap-6 my-6 md:grid-cols-2">
        <div>
          <span className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">
            First Name
          </span>
          <input
            type="text"
            name="firstName"
            {...register("firstName", {
              required: "This field is required",
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="First Name"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </div>
        <div>
          <span className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Last Name
          </span>
          <input
            type="text"
            name="lastName"
            {...register("lastName", {
              required: "This field is required",
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </div>
        <div>
          <span className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone no. (WhatsApp)
          </span>
          <input
            type="tel"
            name="phoneWhatsapp"
            {...register("phoneWhatsapp", {
              required: "This field is required",
              pattern: {
                value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
                message: "Invalid phone number",
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="WhatsApp no."
          />
          {errors.phoneWhatsapp && (
            <span className="text-red-500">{errors.phoneWhatsapp.message}</span>
          )}
        </div>
        <div>
          <span className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone no. (Other)
          </span>
          <input
            type="tel"
            name="phone"
            {...register("phone", {
              required: "This field is required",
              pattern: {
                value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
                message: "Invalid phone number",
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Other no.(If any)"
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>
      </div>
      <div className="grid gap-6 mb-6 md:cols-span-2">
        <div className="">
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email address
          </span>
          <input
            type="email"
            name="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div>
          <span className="block text-sm mb-2 font-medium text-gray-900 dark:text-white">
            Date of Birth:
          </span>
          <input
            type="date"
            name="dateOfBirth"
            {...register("dateOfBirth", {
              required: "This field is required",
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.dateOfBirth && (
            <span className="text-red-500">{errors.dateOfBirth.message}</span>
          )}
        </div>
      </div>
    </div>
  );
}
