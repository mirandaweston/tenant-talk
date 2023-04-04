import React, { useContext } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { HomeIcon } from "@heroicons/react/24/solid";

import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import clsx from "clsx";
import Stars from "../stars/Stars";
import { CloudinaryContext } from "../../contexts/CloudinaryContext";

const ReviewCard = ({
  review: { _id, author, createdAt, overallRating, comment, image },
  index,
}) => {
  const cld = useContext(CloudinaryContext);

  return (
    <Link to={`/review/${_id}`}>
      <div className="flex space-x-4 px-4 text-sm text-gray-500 transition-colors hover:bg-gray-50 sm:px-6">
        <div className="py-10">
          <div
            data-cy="image"
            className="flex h-32 w-32 flex-none items-center justify-center overflow-hidden rounded-md bg-gray-200"
          >
            {image ? (
              <AdvancedImage
                cldImg={cld
                  .image(image)
                  .resize(fill().width(800).height(800).gravity(autoGravity()))}
              />
            ) : (
              <HomeIcon className="h-14 w-14 text-white" />
            )}
          </div>
        </div>

        <div
          className={clsx(
            index === 0 ? "" : "border-t border-gray-200",
            "flex-1 py-10"
          )}
        >
          <h3 className="font-medium text-gray-900">{author.firstName}</h3>
          <p className="mb-4">
            <time dateTime={createdAt}>
              {format(new Date(createdAt), "dd MMMM yyyy")}
            </time>
          </p>

          <Stars value={overallRating} />
          <p className="sr-only">{overallRating} out of 5 stars</p>

          <div className="prose prose-sm mt-4 max-w-none text-gray-500">
            {comment}
          </div>
        </div>
      </div>
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
  index: PropTypes.number,
};

ReviewCard.defaultProps = {
  index: 0,
};

export default ReviewCard;
