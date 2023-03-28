import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useSignup from "../../hooks/useSignup";
import useAuthContext from "../../hooks/useAuthContext";

const Signup = () => {
  const { signup, error, isLoading } = useSignup();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;
    reset();
  }, [isLoading]);

  return (
    <div className="relative flex h-screen justify-center md:px-12 lg:px-0">
      <div className="relative z-10 flex flex-1 flex-col bg-white  sm:justify-center md:flex-none md:px-28">
        <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
          <div className="flex flex-col">
            <div className="mt-20">
              {user && <p>{`Hello ${user.firstName}!`}</p>}
              <h2 className="text-lg font-semibold text-gray-900">
                Sign up for an account
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Already registered?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Sign in
                </Link>{" "}
                to your account.
              </p>
            </div>
          </div>
          <form
            className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
            onSubmit={handleSubmit(signup)}
          >
            <div>
              <label
                id="first_name"
                htmlFor="first_name"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                data-cy="first_name"
                id="first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                {...register("firstName", { required: true, maxLength: 20 })}
              />
            </div>
            <div>
              <label
                id="last_name"
                htmlFor="last_name"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                data-cy="last_name"
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                {...register("lastName", { required: true, maxLength: 20 })}
              />
            </div>
            <div className="col-span-full">
              <label
                id="email"
                htmlFor="email"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                data-cy="email"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className=" block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                {...register("email", { required: true })}
              />
            </div>
            <div className="col-span-full">
              <label
                id="password"
                htmlFor="password"
                className="mb-3 block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                data-cy="password"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                {...register("password", { required: true })}
              />
            </div>
            {error && (
              <div className="col-span-full">
                <p data-cy="error" className="text-red-500">
                  {error}
                </p>
              </div>
            )}
            <div className="col-span-full">
              <button
                data-cy="submit"
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-orange-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://source.unsplash.com/h95mT1m9Zzs/5034x3696"
          alt=""
        />
      </div>
    </div>
  );
};

export default Signup;
