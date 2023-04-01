import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import PropTypes from "prop-types";

const Stars = ({ rating }) => (
  <div className="flex">
    {[0, 1, 2, 3, 4].map((i) => (
      <StarIcon
        key={i}
        className={clsx(
          rating > i ? "text-yellow-400" : "text-gray-300",
          "h-5 w-5 shrink-0"
        )}
        aria-hidden="true"
      />
    ))}
  </div>
);

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Stars;
