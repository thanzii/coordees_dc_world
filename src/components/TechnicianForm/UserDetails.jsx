import { CalendarDate } from "@internationalized/date";
import { DatePicker, Input } from "@nextui-org/react";
import React from "react";
import { Controller } from "react-hook-form";

export default function UserDetails({ register, errors, control }) {
  return (
    <div>
      <div className="flex justify-center w-full my-8 bg-gradient-to-br from-green-500 via-green-400 to-green-300 rounded-md p-1 text-white font-semibold">
        Personal Details
      </div>

      <div className="grid gap-6 my-6 md:grid-cols-2">
        <Input
          size="sm"
          type="text"
          {...register("firstName", { required: "This field is required" })}
          label="First Name"
          isInvalid={errors?.firstName}
          errorMessage={errors?.firstName?.message}
          placeholder="John"
          isRequired
        />

        <Input
          size="sm"
          type="text"
          {...register("lastName", { required: "This field is required" })}
          label="Last Name"
          isInvalid={errors?.lastName}
          errorMessage={errors?.lastName?.message}
          placeholder="Doe"
          isRequired
        />

        <Input
          size="sm"
          type="tel"
          {...register("phoneWhatsapp", {
            required: "This field is required",
            pattern: {
              value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
              message: "Invalid phone number",
            },
          })}
          label="WhatsApp No."
          isInvalid={errors?.phoneWhatsapp}
          errorMessage={errors?.phoneWhatsapp?.message}
          placeholder="+971xxxxxxxxx"
          isRequired
        />

        <Input
          size="sm"
          type="tel"
          {...register("phone", {
            pattern: {
              value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
              message: "Invalid phone number",
            },
          })}
          label="Other No. (Optional)"
          isInvalid={errors?.phone}
          errorMessage={errors?.phone?.message}
          placeholder="+971xxxxxxxxx"
        />
      </div>

      <div className="grid gap-6 mb-6 md:cols-span-2">
        <Input
          size="sm"
          type="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          placeholder="john.doe@gmail.com"
          label="Email"
          isInvalid={errors?.email}
          errorMessage={errors?.email?.message}
          isRequired
        />

        <Controller
          control={control}
          name="dateOfBirth"
          rules={{ required: "This field is required" }}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              label="Birth Date"
              value={value}
              onChange={onChange}
              isInvalid={errors?.dateOfBirth}
              errorMessage={errors?.dateOfBirth?.message}
              showMonthAndYearPickers
              isRequired
            />
          )}
        />
      </div>
    </div>
  );
}
