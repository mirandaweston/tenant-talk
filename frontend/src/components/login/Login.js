import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useLogin from "../../hooks/useLogin";
import useAuthContext from "../../hooks/useAuthContext";

const Login = () => {
  const { login, error, isLoading } = useLogin();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;
    reset();
  }, [isLoading]);

  return (
    <div className="relative flex h-screen justify-center md:px-12 lg:px-0">
      <div className="relative z-10 flex flex-1 flex-col bg-white  sm:justify-center md:flex-none md:px-28">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex lg:flex-1">
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">Tenant Talk</span>
              <svg
                className="w-10 fill-orange-500"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1,0 h18 a1,1 0 0 1 1,1 v6 a1,1 0 0 1 -1,1 h-5 l-8 8 v3 a1,1 0 0 0 1,1 h6 a1,1 0 0 0 1,-1 v-3 l-8 -8 h-5 a1,1 0 0 1 -1,-1 v-6 a1,1 0 0 1 1,-1 z" />
              </svg>
              <br />
              {user && <p>{`Hello ${user.firstName}!`}</p>}
              <h2 className="text-lg font-semibold text-gray-900">
                Log into your account
              </h2>
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-700">
            Not signed up yet?{" "}
            <Link
              data-cy="signup-link"
              to="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>{" "}
            here.
          </p>

          <div className="mt-6">
            <form className="space-y-6" onSubmit={handleSubmit(login)}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    data-cy="email"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("email", { required: true, maxLength: 50 })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    data-cy="password"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("password", { required: true, minLength: 5 })}
                  />
                </div>
              </div>

              {error && (
                <div className="col-span-full">
                  <p data-cy="error" className="text-red-500">
                    {error}
                  </p>
                </div>
              )}
              <div>
                <button
                  data-cy="submit"
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://source.unsplash.com/nrSzRUWqmoI/5184x3456"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
