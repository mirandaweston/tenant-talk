import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import Stars from "../stars/Stars";

const PropertyCard = ({ property }) => {
  const getAverage = ({ reviews }) => {
    const ratings = reviews.map(({ overallRating }) => overallRating);
    return ratings.reduce((a, b) => a + b) / ratings.length;
  };

  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
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

          <Stars rating={getAverage(property)} />
          <p className="sr-only">{getAverage(property)} out of 5 stars</p>
        </div>
      </div>
    </li>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    address: PropTypes.string,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({ overallRating: PropTypes.number })
    ),
    _id: PropTypes.string,
  }).isRequired,
};

export default PropertyCard;
