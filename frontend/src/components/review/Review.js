import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import useAxios from "axios-hooks";
import useAuthContext from "../../hooks/useAuthContext";
import { format } from "date-fns";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { CloudinaryContext } from "../../contexts/CloudinaryContext";
import Stars from "../stars/Stars";

const detailedRatings = [
  { name: "landlordRating", label: "Landlord" },
  { name: "conditionRating", label: "Condition" },
  { name: "neighbourRating", label: "Neighbours" },
  { name: "warmthRating", label: "Warmth" },
  { name: "parkingRating", label: "Parking" },
  { name: "areaRating", label: "Area" },
];

const Review = () => {
  const { id } = useParams();
  const { token } = useAuthContext();
  const [{ loading, data, error }, refetch] = useAxios({
    url: `/review/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(data);

  useEffect(() => {
    refetch();
  }, []);

  const cld = useContext(CloudinaryContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return null; // change this dependent on if we need to return. Should page
  // be accessible if we haven't hit a property value in the previous path.

  return (
    <div className="bg-white">
      <div className="pb-16 pt-6 sm:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <ol role="list" className="flex items-center space-x-4">
            <li className="text-sm">
              <Link
                to={`/property/${data.review.property._id}`}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                <span aria-hidden="true">&larr; </span>
                {data.review.property.address}
              </Link>
            </li>
          </ol>
        </nav>
        <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {data.review.author.firstName} |{" "}
                  {format(new Date(data.review.createdAt), "dd MMMM yyyy")}{" "}
                </h1>
              </div>
              {/* Reviews */}
              <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <p>Overall Rating</p>
                  <Stars rating={data.review.overallRating} />
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                <div className={"rounded-lg lg:col-span-2 lg:row-span-2"}>
                  <AdvancedImage cldImg={cld.image(data.review.image)} />
                </div>
              </div>
            </div>

            {/* Product details */}
            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">
                Review Comment
              </h2>

              <div
                className="prose prose-sm mt-4 text-gray-500"
                dangerouslySetInnerHTML={{ __html: data.review.comment }}
              />
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">
                Detailed Reviews
              </h2>

              {detailedRatings.map(({ name, label }) => (
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    {label}

                    <Stars rating={data.review[name]} />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
