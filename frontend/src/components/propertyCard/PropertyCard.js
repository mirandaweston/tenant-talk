import { Link } from "react-router-dom";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
// import { scale } from "@cloudinary/transformation-builder-sdk";
import Stars from "../stars/Stars";
import { CloudinaryContext } from "../../contexts/CloudinaryContext";

const PropertyCard = ({ property }) => {
  const getAverage = ({ reviews }) => {
    const ratings = reviews.map(({ overallRating }) => overallRating);
    return ratings.reduce((a, b) => a + b) / ratings.length;
  };

  const cld = useContext(CloudinaryContext);

  const { reviews } = property;

  const publicId = property.reviews[reviews.length - 1].image;

  const myImage = cld
    .image(publicId)
    .resize(fill().width(400).height(300).gravity(autoGravity()));

  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className=" space-y-3">
          <div>
            <AdvancedImage cldImg={myImage} />
          </div>
          <div>
            <Link
              to={`/property/${property._id}`}
              className="truncate text-sm font-medium text-gray-900"
            >
              {property.address}
            </Link>
            <p className="mt-1 truncate text-sm text-gray-500">
              {`Reviews: ${reviews.length}`}
            </p>
          </div>
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
      PropTypes.shape({
        overallRating: PropTypes.number,
        image: PropTypes.string,
      })
    ),
    _id: PropTypes.string,
  }).isRequired,
};

export default PropertyCard;
