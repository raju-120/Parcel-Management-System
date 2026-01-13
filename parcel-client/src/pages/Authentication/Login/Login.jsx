import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link } from 'react-router';
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {register,handleSubmit,formState: { errors }} = useForm();
  const {createUser} = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email,data.password)
    .then(result => {
      console.log("Result: ",result?.user)
    })
    .catch(error=>{
      console.error("Login Has error: ",error);
    })
  };

  return (
    <div className=" flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-base-content">
            Login to Your Account
          </h2>
          <p className="text-center text-base-content/70 mb-4">
            Welcome back! Please enter your credentials.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  Email is required
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              />
              {errors.password?.type === "required" && (
                <p className="text-error text-sm mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-error text-sm mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <a className="link link-hover text-sm">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-primary w-full mt-2">
              Login
            </button>
          </form>

          {/* Footer */}
          {/* <div className="divider"></div> */}
          <p>New to this website? <Link
            state={location.state}
            className='text-blue-400 underline font-semibold'
            to="/register">Register</Link>
          </p>
        </div>
        <SocialLogin ></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
