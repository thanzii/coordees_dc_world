import React from "react";
import Company from "../Company/Company";
import MapWithSearch from "../MapWithSearch/MapWithSearch";

export default function ProfessionalDetails({
  register,
  errors,
  hasDrivingLicense,
}) {
  return (
    <div className="">
      <div className="flex justify-center w-full mt-6 bg-gradient-to-br from-green-500 via-green-400 to-green-300 rounded-md p-1 text-white font-semibold md:col-auto">
        Professional Details
      </div>
      <div className="grid gap-6 mb-6 py-10 md:grid-cols-2">
        <div className="md:col-span-2">
          <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Company Name
          </span>
          <Company />
        </div>
        <div className="">
          <span className="block  my-2 text-sm font-medium text-gray-900 dark:text-white">
            Emirates ID
          </span>
          <input
            type="number"
            name="eId"
            {...register("eId", {
              required: "This field is required",
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="emirates id no."
          />
          {errors.eId && (
            <span className="text-red-500">{errors.eId.message}</span>
          )}
          <input
            type="file"
            name="eIdFile"
            {...register("eIdFile", {
              required: "This field is required",
            })}
            className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="emirates id File"
          />
          {errors.eIdFile && (
            <span className="text-red-500">{errors.eIdFile.message}</span>
          )}
        </div>
        <div>
          <span className="block  my-2 text-sm font-medium text-gray-900 dark:text-white">
            Company license no.
          </span>
          <input
            type="text"
            name="companyLicenseNo"
            {...register("companyLicenseNo", {
              required: "This field is required",
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="company license no."
          />
          {errors.companyLicenseNo && (
            <span className="text-red-500">
              {errors.companyLicenseNo.message}
            </span>
          )}
          <input
            type="file"
            name="companyLicenseFile"
            {...register("companyLicenseFile", {
              required: "This field is required",
            })}
            className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="company license doc."
          />
          {errors.companyLicenseFile && (
            <span className="text-red-500">
              {errors.companyLicenseFile.message}
            </span>
          )}
        </div>
        <div>
          <span className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Profession
          </span>
          <select
            type="select"
            name="profession"
            {...register("profession", {
              required: "This field is required",
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select Profession"
          >
            <option value="" disabled>
              Select profession
            </option>
            <option value="cctvTechnician">CCTV Technician</option>
            <option value="electrician">Electrician</option>
            <option value="plumber">Plumber</option>
          </select>
          {errors.profession && (
            <span className="text-red-500">{errors.profession.message}</span>
          )}
          <div>
            <span className="block pt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Support File
            </span>
            <input
              type="file"
              name="supportFile"
              {...register("supportFile", {
                required: "This field is required",
              })}
              className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="support file"
            />
            {errors.supportFile && (
              <span className="text-red-500">{errors.supportFile.message}</span>
            )}
          </div>
        </div>
        <div>
          <span className="block mb-2 text-sm font-medium text-gray-900">
            Driving license no.
          </span>
          <input
            type="radio"
            {...register("hasDrivingLicense", {
              required: "This field is required",
            })}
            className="rounded-lg p-2 m-2"
            value="true"
            checked={hasDrivingLicense === "true"}
          />
          <span className=" mb-2 text-sm text-gray-900">Yes</span>
          <input
            type="radio"
            {...register("hasDrivingLicense", {
              required: "This field is required",
            })}
            className="rounded-lg p-2 m-2"
            value="false"
            checked={hasDrivingLicense === "false"}
          />
          <span className=" mb-2 text-sm text-gray-900">No</span>
          {errors.hasDrivingLicense && (
            <span className="text-red-500">
              {errors.hasDrivingLicense.message}
            </span>
          )}
          {hasDrivingLicense === "true" && (
            <div>
              <input
                type="number"
                name="drivingLicenseNo"
                {...register("drivingLicenseNo", {
                  required: "This field is required",
                })}
                className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="driving license no."
              />
              {errors.drivingLicenseNo && (
                <span className="text-red-500">
                  {errors.drivingLicenseNo.message}
                </span>
              )}
              <input
                type="file"
                name="drivingLicenseFile"
                {...register("drivingLicenseFile", {
                  required: "This field is required",
                })}
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="driving license file"
              />
              {errors.drivingLicenseFile && (
                <span className="text-red-500">
                  {errors.drivingLicenseFile.message}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="md:col-span-2">
          <span className="block text-sm font-medium text-gray-900">
            Location
          </span>
          <MapWithSearch />
        </div>
      </div>
    </div>
  );
}
