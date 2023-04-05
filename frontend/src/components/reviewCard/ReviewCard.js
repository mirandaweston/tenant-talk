import React, { useContext } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import Stars from "../stars/Stars";
import { CloudinaryContext } from "../../contexts/CloudinaryContext";

const ReviewCard = ({
  review: { _id, author, createdAt, overallRating, comment, image },
}) => {
  const cld = useContext(CloudinaryContext);

  return (
    <Link to={`/review/${_id}`}>
      <li className="overflow-hidden rounded-md bg-white px-6 py-4 shadow">
        <div className="flex items-center space-x-4">
          {/* Image */}
          <div
            data-cy="image"
            className="flex h-32 w-32 flex-none items-center justify-center rounded-md bg-gray-200"
          >
            {image ? (
              <AdvancedImage
                cldImg={cld
                  .image(image)
                  .resize(fill().width(800).height(800).gravity(autoGravity()))}
                className="rounded-md"
              />
            ) : (
              <HomeIcon className="h-14 w-14 text-white" />
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
