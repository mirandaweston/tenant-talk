import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import useSignup from "../../hooks/useSignup";

const fields = [
  {
    name: "firstName",
    label: "First name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Last name",
    type: "text",
    autoComplete: "family-name",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    autoComplete: "email",
    style: "col-span-full",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    autoComplete: "new-password",
  },
];

const Signup = () => {
  const { signup, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isLoading) return;
    reset({ password: null, confirmPassword: null });
  }, [isLoading]);

  return (
    <>
      <Link to="/">
        <svg
          className="h-12 w-auto fill-orange-500"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1,0 h18 a1,1 0 0 1 1,1 v6 a1,1 0 0 1 -1,1 h-5 l-8 8 v3 a1,1 0 0 0 1,1 h6 a1,1 0 0 0 1,-1 v-3 l-8 -8 h-5 a1,1 0 0 1 -1,-1 v-6 a1,1 0 0 1 1,-1 z" />
        </svg>
      </Link>

      <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
        Sign up for an account
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        Already registered?{" "}
        <Link
          to="/login"
          className="font-medium text-orange-500 hover:text-orange-400"
        >
          Log in
        </Link>{" "}
        to your account.
      </p>

      <form
        onSubmit={handleSubmit(signup)}
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {fields.map(({ name, label, type, autoComplete, style }) => (
          <div key={name} className={style}>
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
                  "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
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
                  ...(name === "password" && {
                    pattern: {
                      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                      message:
                        "Password must contain at least eight characters, at least one uppercase letter, one lowercase letter and one number",
                    },
                  }),
                  ...(name === "confirmPassword" && {
                    validate: (value) => {
                      if (watch("password") !== value)
                        return "Passwords do not match";
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

        <div className="col-span-full">
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
            data-cy="submit"
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
};

export default Signup;
