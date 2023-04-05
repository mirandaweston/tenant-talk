import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import useLogin from "../../hooks/useLogin";

const fields = [
  {
    name: "email",
    label: "Email",
    type: "text",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
  },
];

const Login = () => {
  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isLoading) return;
    reset({ password: null });
  }, [isLoading]);

  return (
    <>
      <svg
        className="h-12 w-auto fill-orange-500"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1,0 h18 a1,1 0 0 1 1,1 v6 a1,1 0 0 1 -1,1 h-5 l-8 8 v3 a1,1 0 0 0 1,1 h6 a1,1 0 0 0 1,-1 v-3 l-8 -8 h-5 a1,1 0 0 1 -1,-1 v-6 a1,1 0 0 1 1,-1 z" />
      </svg>

      <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Log in to your account
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-orange-500 hover:text-orange-400"
        >
          Sign up here
        </Link>
        .
      </p>

      <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
        {fields.map(({ name, label, type, autoComplete }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {label}
            </label>
            <div className="mt-2">
              <input
                id={name}
                type={type}
                autoComplete={autoComplete}
                className={clsx(
                  errors[name]
                    ? "ring-red-500 focus:ring-red-500"
                    : "ring-gray-300 focus:ring-orange-500",
                  "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                )}
                {...register(name, {
                  required: `${label} is required`,
                  ...(name === "email" && {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email address",
                    },
                  }),
                })}
                data-cy={name}
              />
            </div>
            {errors[name] && (
              <p
                role="alert"
                className="ml-1 mt-1 text-xs font-medium tracking-wide text-red-500"
              >
                {errors[name].message}
              </p>
            )}
          </div>
        ))}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
            data-cy="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
