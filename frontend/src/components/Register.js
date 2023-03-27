import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "axios-hooks";
import Button from "./Button";

const Register = () => {
  const [{ loading, error }, postData] = useAxios(
    {
      url: "/auth",
      method: "POST",
    },
    { manual: true }
  );

  const { register, handleSubmit } = useForm();
  const onSubmit = async (user) => {
    const newUser = await postData({ data: user });
    console.log(newUser.data);
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="relative flex h-screen justify-center md:px-12 lg:px-0">
      <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
        <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
          <div className="flex flex-col">
            <div className="mt-20">
              <h2 className="text-lg font-semibold text-gray-900">
                Get started for free
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
            onSubmit={handleSubmit(onSubmit)}
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
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                {...register("password", { required: true })}
              />
            </div>
            <div className="col-span-full">
              <Button
                type="submit"
                variant="solid"
                color="blue"
                disabled={loading}
                className="w-full"
              >
                <span>
                  Sign up <span aria-hidden="true">&rarr;</span>
                </span>
              </Button>
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

export default Register;
