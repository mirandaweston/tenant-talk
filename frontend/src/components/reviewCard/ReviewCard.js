import React from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Stars from "../stars/Stars";

const ReviewCard = ({
  review: { _id, author, createdAt, overallRating, comment },
}) => {
  return (
    <li className="overflow-hidden rounded-md bg-white px-6 py-4 shadow">
      <Link to={`/review/${_id}`}>
        <div className="space-y-3 text-sm text-gray-500">
          <div>
            <h3 className="font-medium text-gray-900">{author.firstName}</h3>
            <p>{format(new Date(createdAt), "dd MMMM yyyy")}</p>
          </div>

          <Stars rating={overallRating} />
          <p className="sr-only">{overallRating} out of 5 stars</p>

          <div className="prose prose-sm mt-4 max-w-none text-gray-900">
            {comment}
          </div>
        </div>
      </Link>
    </li>
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
  }).isRequired,
};

export default ReviewCard;
