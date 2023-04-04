import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import useAuthContext from "../../hooks/useAuthContext";

const UpdatePasswordForm = () => {
  const { token, dispatch } = useAuthContext();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(null);

  const updatePassword = async ({ confirmPassword, ...formData }) => {
    setIsLoading(true);

    try {
      const { data } = await axios.patch("/user/password", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: "refresh",
        payload: data,
      });
      toast.success("Password updated");
    } catch (err) {
      toast.error(`Update failed, error: ${err.response.data.message}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Password
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Update your password
        </p>
      </div>

      <form
        onSubmit={handleSubmit(updatePassword)}
        className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Current Password
              </label>
              <div className="mt-2">
                <input
                  {...register("currentPassword", { required: true })}
                  id="currentPassword"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  {...register("newPassword", {
                    required: true,
                  })}
                  type="password"
                  id="newPassword"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => {
                      if (watch("newPassword") !== value)
                        return "Your new passwords do not match";
                    },
                  })}
                  type="password"
                  id="confirmPassword"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {errors.confirmPassword && (
              <div className="sm:col-span-4">
                <p role="alert" className="text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 p-4 sm:px-8">
          <button
            type="button"
            onClick={() => reset()}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
