import React, { useContext } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";

import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import Stars from "../stars/Stars";
import { CloudinaryContext } from "../../contexts/CloudinaryContext";

const ReviewCard = ({ review }) => {
  const cld = useContext(CloudinaryContext);

  const publicId = review.image;

  const myImage = cld
    .image(publicId)
    .resize(fill().width(400).height(400).gravity(autoGravity()));

  return (
    <li className="overflow-hidden rounded-md bg-white px-6 py-4 shadow">
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        {/* Image */}
        <div
          data-cy="image"
          className="h-32 w-32 flex-none rounded-md bg-gray-100"
        >
          {publicId ? (
            <AdvancedImage cldImg={myImage} className="rounded-md" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "scale-down",
              }}
            >
              {/* SVG path */}
            </svg>
          )}
        </div>

        {/* Review details */}
        <div className="grow">
          <div>
            <h3 className="font-medium text-gray-900">
              {review.author.firstName}
            </h3>
            <p>{format(new Date(review.createdAt), "dd MMMM yyyy")}</p>
          </div>

          <Stars rating={review.overallRating} />
          <p className="sr-only">{review.overallRating} out of 5 stars</p>

          <div className="prose prose-sm mt-4 max-w-none text-gray-900">
            {review.comment}
          </div>
        </div>
      </div>
    </li>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.shape({
      firstName: PropTypes.string,
    }),
    createdAt: PropTypes.string,
    comment: PropTypes.string,
    overallRating: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};

export default ReviewCard;
