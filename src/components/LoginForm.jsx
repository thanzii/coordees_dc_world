import React, { useState } from "react";
import coordeesLogoExpanded from "../assets/coordeesLogoExpand.svg";
import loginIcon from "../assets/login.svg";
import { connect } from "react-redux";
import CryptoJS from "crypto-js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [authMessage, setAuthMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const hashedPassword = CryptoJS.SHA256(password).toString();
    login({ email, password: hashedPassword }).then((path) =>
      navigate(path, { replace: true })
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-gradient-to-br from-stone-300 via-stone-200 to-stone-50 rounded-md shadow-lg overflow-auto no-scrollbar sm:p-2 mx-6">
        <div className="flex flex-col items-center m-2">
          <img
            src={coordeesLogoExpanded}
            alt="coordeeslogo"
            className="h-12 my-2 mx-3 pb-1 border-b-2 border-green-500"
          />
          <div
            className="text-center text-white font-semibold mt-4"
            id="authMessage"
          >
            {authMessage && (
              <div
                className={login.success ? "text-green-500" : "text-red-500"}
              >
                {authMessage}
              </div>
            )}
          </div>
        </div>
        <form className="px-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid m-2">
            <label className="my-1">Email</label>
            <input
              className="p-2 rounded-md shadow-md border-slate-400"
              type="email"
              id="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="grid my-8 mx-2">
            <label className="my-1">Password</label>
            <input
              className="p-2 rounded-md shadow-md border-slate-400"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gradient-to-bl from-green-500 via-green-400 to-green-300 hover:bg-gradient-to-tr hover:from-green-500 hover:via-green-400 hover:to-green-300 text-lg text-white py-2 px-6 mb-4 font-semibold rounded-md shadow-md flex items-center justify-center"
              type="submit"
            >
              <span>Login</span>
              <img src={loginIcon} alt="login" className="ml-2 h-5 w-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapDispatchToProps = ({ userModel: { login } }) => ({ login });

export default connect(null, mapDispatchToProps)(LoginForm);
