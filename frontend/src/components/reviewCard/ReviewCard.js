import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";

import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import Stars from "../stars/Stars";
import { CloudinaryContext } from "../../contexts/CloudinaryContext";

const ReviewCard = ({
  const cld = useContext(CloudinaryContext);
  review: { _id, author, createdAt, overallRating, comment,image },
}) => {

  return (
    <Link to={`/review/${_id}`}>
      <li className="overflow-hidden rounded-md bg-white px-6 py-4 shadow">
        <div className="flex items-center space-x-4">


        {/* Image */}
        <div
            data-cy="image"
            className="h-32 w-32 flex-none rounded-md bg-gray-100"
        >
          {image ? (
              <AdvancedImage cldImg={cld
                  .image(image)
                  .resize(fill().width(400).height(400).gravity(autoGravity()))} className="rounded-md" />
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


        <div className="space-y-3 text-sm text-gray-500">
          <div>
            <h3 className="font-medium text-gray-900">{author.firstName}</h3>
            <p>{format(new Date(createdAt), "dd MMMM yyyy")}</p>
          </div>

          <Stars value={overallRating} />
          <p className="sr-only">{overallRating} out of 5 stars</p>

          <div className="prose prose-sm mt-4 max-w-none text-gray-900">
            {comment}
          </div>
        </div>
        </div>
      </li>
    </Link>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string,
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
