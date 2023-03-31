import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import useAuthContext from "../../hooks/useAuthContext";
import ReviewCard from "../reviewCard/reviewCard";
import { StarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const PropertyReviewsPage = () => {
  const { id } = useParams();
  const { token } = useAuthContext();
  const [{ loading, data, error }, refetch] = useAxios({
    url: `/property/${id}`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return null; // change this dependent on if we need to return. Should page
  // be accessible if we haven't hit a property value in the previous path.

  const getAverage = ({ reviews }) => {
    const ratings = reviews.map(({ overallRating }) => overallRating);
    return ratings.reduce((a, b) => a + b) / ratings.length;
  };

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {data.property.address}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {"Reviews: " + data.property.reviews.length}
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Overall Rating
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              <div className="mt-4 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={clsx(
                      getAverage(data.property) > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
                <p className="mt-1 text-sm text-gray-500">
                  {getAverage(data.property)} out of 5 stars
                </p>
              </div>
            </dd>
          </div>
          {/* <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Rating Criteria 2</dt>
              <dd className="mt-1 text-sm text-gray-900">STARS</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Rating Criteria 3</dt>
              <dd className="mt-1 text-sm text-gray-900">STARS</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Rating Criteria 4</dt>
              <dd className="mt-1 text-sm text-gray-900">STARS</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Pets Yes/No</dt>
              <dd className="mt-1 text-sm text-gray-900">Yes/No</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Deposit Returned Yes/No</dt>
              <dd className="mt-1 text-sm text-gray-900">Yes/No</dd>
            </div> */}
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Reviews</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <ul role="list" className="space-y-3">
                {data.property.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PropertyReviewsPage;
