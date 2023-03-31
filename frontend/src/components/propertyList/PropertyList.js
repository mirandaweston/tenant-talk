import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Link } from "react-router-dom";

const PropertyList = ({ properties }) => {
  const getAverage = ({ reviews }) => {
    const ratings = reviews.map(({ overallRating }) => overallRating);
    return ratings.reduce((a, b) => a + b) / ratings.length;
  };
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {properties.map((property) => (
        <li
          key={property._id}
          className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <Link
                  to={`/property/${property._id}`}
                  className="truncate text-sm font-medium text-gray-900"
                >
                  {property.address}
                </Link>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">
                {`Reviews: ${property.reviews.length}`}
              </p>
              <div className="mt-4 flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={clsx(
                      getAverage(property) > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "h-5 w-5 shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{getAverage(property)} out of 5 stars</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PropertyList;
