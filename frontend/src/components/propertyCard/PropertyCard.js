import { Link } from "react-router-dom";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
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

  // const defaultImage = cld.image(
  //   "360_F_319170349_zCJ6Fe0S3IpBEBxFxYiRFhG6K5Jnlifa_gfnq8u"
  // );

  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div
        data-cy="PropertyCard"
        className="flex w-full items-center justify-between space-x-6 p-6"
      >
        <div className=" space-y-3">
          <div data-cy="image">
            {publicId ? (
              <AdvancedImage cldImg={myImage} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                // className="h-300 w-400 bg-orange-400"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                />
              </svg>

              // <AdvancedImage cldImg={defaultImage} />
            )}
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
          <Stars value={getAverage(property)} />
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
