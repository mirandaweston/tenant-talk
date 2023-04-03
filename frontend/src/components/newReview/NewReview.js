import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import SearchValidate from "../searchValidate/SearchValidate";
import useAuthContext from "../../hooks/useAuthContext";
import RadioGroupStars from "../radioGroupStars/RadioGroupStars";

const ratingValues = [
  { name: "landlordRating", label: "Landlord" },
  { name: "conditionRating", label: "Condition" },
  { name: "neighbourRating", label: "Neighbours" },
  { name: "warmthRating", label: "Warmth" },
  { name: "parkingRating", label: "Parking" },
  { name: "areaRating", label: "Area" },
];

const NewReview = () => {
  const { token } = useAuthContext();
  const [, setError] = useState(null);
  const [, setIsLoading] = useState(null);
  const [foundPropertyId, setFoundPropertyId] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const createReview = async ({ comment, address, overallRating }) => {
    setIsLoading(true);
    setError(null);

    console.log(overallRating);

    const property = foundPropertyId
      ? { _id: foundPropertyId }
      : {
          address,
        };

    const formData = { property, review: { comment, overallRating } };

    try {
      const { data } = await axios.post("/review/new", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/property/${data.property._id}`);
    } catch (err) {
      setError(err.response.data.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Property
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Select the property that you wish to review
          </p>
        </div>

        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <Controller
                  control={control}
                  name="address"
                  rules={{ required: true }}
                  render={({ field: { ref, ...field } }) => (
                    <SearchValidate
                      foundPropertyId={foundPropertyId}
                      setFoundPropertyId={setFoundPropertyId}
                      {...field}
                    />
                  )}
                />

                {errors.address?.type === "required" && (
                  <p role="alert">Address is required</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Review
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Create a review for this property
          </p>
        </div>

        <form
          onSubmit={handleSubmit(createReview)}
          className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Comment
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:py-1.5 sm:text-sm sm:leading-6"
                    defaultValue=""
                    placeholder="The house was lovely and warm in the winter and my neighbours were..."
                    {...register("comment", { required: true })}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Please write your review above, click{" "}
                  <Link className="text-orange-500" to="/about">
                    here
                  </Link>{" "}
                  for some writing tips.
                </p>
              </div>

              <div className="col-span-full">
                <div className="w-fit">
                  <Controller
                    control={control}
                    name="overallRating"
                    rules={{ required: true }}
                    render={({ field: { ref, ...field } }) => (
                      <RadioGroupStars label="Overall Rating" {...field} />
                    )}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Detailed Ratings
                </legend>
              </div>

              {ratingValues.map(({ name, label }) => (
                <div key={name} className="sm:col-span-3">
                  <div className="w-fit">
                    <Controller
                      control={control}
                      name={name}
                      rules={{ required: true }}
                      render={({ field: { ref, ...field } }) => (
                        <RadioGroupStars
                          label={label}
                          labelPosition="side"
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 p-4 sm:px-8">
            <button
              type="submit"
              className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReview;
