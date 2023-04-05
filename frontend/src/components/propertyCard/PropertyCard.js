import { Link } from "react-router-dom";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { HomeIcon } from "@heroicons/react/24/solid";
import Stars from "../stars/Stars";
import { CloudinaryContext } from "../../contexts/CloudinaryContext";

const PropertyCard = ({ property: { address, reviews, _id: propertyId } }) => {
  const cld = useContext(CloudinaryContext);

  const averageOverallRating = Math.round(
    reviews.reduce((total, { overallRating }) => total + overallRating, 0) /
      reviews.length
  );

  const publicId = reviews[reviews.length - 1].image;

  return (
    <Link to={`/property/${propertyId}`}>
      <li
        data-cy="PropertyCard"
        className="col-span-1 flex w-full items-center justify-between space-x-6 divide-y divide-gray-200 rounded-lg bg-white p-6 shadow transition-colors hover:bg-gray-50"
      >
        <div className="w-full space-y-3">
          <div
            data-cy="image"
            className="flex aspect-square w-full items-center justify-center rounded-md bg-gray-200"
          >
            {publicId ? (
              <AdvancedImage
                cldImg={cld
                  .image(publicId)
                  .resize(fill().width(800).height(800).gravity(autoGravity()))}
              />
            ) : (
              <HomeIcon className="h-24 w-24 text-white" />
            )}
          </div>
          <div>
            <p className="truncate text-sm font-medium text-gray-900">
              {address}
            </p>
            <p className="mt-1 truncate text-sm text-gray-500">
              {`Reviews: ${reviews.length}`}
            </p>
          </div>
          <Stars value={averageOverallRating} />
          <p className="sr-only">{averageOverallRating} out of 5 stars</p>
        </div>
      </li>
    </Link>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    address: PropTypes.string,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        overallRating: PropTypes.number,
        image: PropTypes.string,
      })
    ),
    _id: PropTypes.string,
  }).isRequired,
};

export default PropertyCard;
