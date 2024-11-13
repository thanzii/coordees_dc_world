/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Company from "../Company/Company";
import MapWithSearch from "../MapWithSearch/MapWithSearch";
import {
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import FileUpload from "../FileUpload/FileUpload";
import { Controller } from "react-hook-form";

export default function ProfessionalDetails({
  control,
  register,
  errors,
  hasDrivingLicense,
  watch,
  setValue,
}) {
  const profession = [
    { key: "cctvTechnician", label: "CCTV Technician" },
    { key: "electrician", label: "Electrician" },
    { key: "plumber", label: "Plumber" },
  ];

  const eIdFile = watch("eIdFile");
  const supportFile = watch("supportFile");
  const drivingLicenseFile = watch("drivingLicenseFile");

  useEffect(() => {
    if (eIdFile) {
      setValue("eIdFile", eIdFile);
    }
    if (supportFile) {
      setValue("supportFile", supportFile);
    }
    if (drivingLicenseFile) {
      setValue("drivingLicenseFile", drivingLicenseFile);
    }
  }, [eIdFile, supportFile, drivingLicenseFile]);

  return (
    <div className="">
      <div className="flex justify-center w-full mt-6 bg-gradient-to-br from-green-500 via-green-400 to-green-300 rounded-md p-1 text-white font-semibold md:col-auto">
        Professional Details
      </div>

      <div className="bg-white border-1 rounded-xl mt-5">
        <span className="text-xs pl-2">
          Company Name <span className="text-red-500 text-sm">*</span>
        </span>
        <Company control={control} setValue={setValue} errors={errors} />
      </div>
      {errors?.company && (
        <span className="text-red-500 text-xs pl-1">
          {errors?.company.message}
        </span>
      )}

      <div className="grid gap-6 mb-6 py-5 md:grid-cols-2">
        <div>
          <Input
            className="mb-4"
            size="sm"
            type="text"
            {...register("eId", {
              required: "This field is required",
            })}
            label="Emirates ID No."
            isInvalid={errors?.eId}
            errorMessage={errors?.eId?.message}
            isRequired
          />

          <Controller
            name="eIdFile"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, ...field } }) => (
              <FileUpload
                label="Emirates ID File"
                isRequired
                error={errors?.eIdFile}
                onChange={(e) => {
                  onChange(e.target.files[0]);
                }}
                {...field}
              />
            )}
          />
        </div>

        <div>
          <Select
            size="sm"
            label="Profession"
            placeholder="Select Profession"
            className="max-w-xs mb-4"
            {...register("profession", {
              required: "This field is required",
            })}
            isInvalid={errors?.profession}
            errorMessage={errors?.profession?.message}
            isRequired
          >
            {profession.map((prof) => (
              <SelectItem key={prof.key}>{prof.label}</SelectItem>
            ))}
          </Select>

          <Controller
            name="supportFile"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field: { onChange, ...field } }) => (
              <FileUpload
                label="Profession Support File"
                isRequired
                error={errors?.supportFile}
                onChange={(e) => {
                  onChange(e.target.files[0]);
                }}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="hasDrivingLicense"
          defaultValue="false"
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              label="Do you have a driving license?"
              orientation="horizontal"
              value={value}
              onValueChange={onChange}
              isInvalid={errors?.hasDrivingLicense}
              errorMessage={errors?.hasDrivingLicense?.message}
              classNames={{ label: "text-black" }}
            >
              <Radio
                size="sm"
                value="true"
                className="checked:border-green-500"
                classNames={{
                  wrapper: "bg-white border-green-500",
                  control: "bg-green-500",
                }}
              >
                Yes
              </Radio>

              <Radio
                size="sm"
                value="false"
                classNames={{
                  wrapper: "bg-white border-green-500",
                  control: "bg-green-500",
                }}
              >
                No
              </Radio>
            </RadioGroup>
          )}
        />

        <div>
          {hasDrivingLicense === "true" && (
            <div>
              <Input
                className="mb-4"
                size="sm"
                type="number"
                {...register("drivingLicenseNo", {
                  required: "This field is required",
                })}
                label="Driving License No."
                isInvalid={errors?.drivingLicenseNo}
                errorMessage={errors?.drivingLicenseNo?.message}
                isRequired
              />

              <Controller
                name="drivingLicenseFile"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field: { onChange, ...field } }) => (
                  <FileUpload
                    label="Driving License File"
                    isRequired
                    error={errors?.supportFile}
                    onChange={(e) => {
                      onChange(e.target.files[0]);
                    }}
                    {...field}
                  />
                )}
              />
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <MapWithSearch control={control} />
        </div>
      </div>
    </div>
  );
}
