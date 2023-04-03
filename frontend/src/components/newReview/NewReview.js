import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import SearchValidate from "../searchValidate/SearchValidate";
import useAuthContext from "../../hooks/useAuthContext";
import useUpload from "../../hooks/useUpload";

const NewReview = () => {
  const { token } = useAuthContext();
  const imageInputRef = useRef();
  const [, setError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [, setIsLoading] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [foundProperty, setFoundProperty] = useState(null);
  const [overallRating, setOverallRating] = useState(1);
  const [imageInput, setImageInput] = useState(null);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const upload = useUpload();

  const createReview = async ({ comment }) => {
    setIsLoading(true);
    setError(null);

    if (!selectedPlace) {
      setAddressError("Please select a property to review");
      return;
    }

    const property = foundProperty
      ? { _id: foundProperty._id }
      : {
          address: selectedPlace,
        };

    const publicId = await upload(imageInput);

    const formData = {
      property,
      review: { comment, overallRating, image: publicId },
    };

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
                <SearchValidate
                  selectedPlace={selectedPlace}
                  setSelectedPlace={setSelectedPlace}
                  foundProperty={foundProperty}
                  setFoundProperty={setFoundProperty}
                />
                {addressError && (
                  <div className="mt-2 text-sm text-red-500">
                    {addressError}
                  </div>
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
                <div className="flex items-center gap-4">
                  <input
                    data-cy="file"
                    type="file"
                    ref={imageInputRef}
                    onChange={(e) => setImageInput(e.target.files[0])}
                    className="block h-[38px] w-full cursor-pointer rounded-lg border border-blue-500 p-1 text-center text-sm text-gray-900 focus:outline-none"
                  />
                  {/* <Button
                    text={`${isLoading ? "Uploading..." : "Post"}`}
                    type="submit"
                    id="submit"
                    buttonStyle="outline"
                    className="max-w-xs"
                    isDisabled={isLoading}
                  /> */}
                </div>
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
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Overall Rating
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        onClick={() => setOverallRating(rating + 1)}
                        className={clsx(
                          overallRating > rating
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "h-5 w-5 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>
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
