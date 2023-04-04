import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import PropTypes from "prop-types";

const Stars = ({ value, label, labelPosition }) => (
  <div
    className={labelPosition === "side" ? "flex justify-between" : "space-y-1"}
  >
    {label && (
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
    )}
    <div id={label} className="flex">
      {[0, 1, 2, 3, 4].map((rating) => (
        <StarIcon
          key={rating}
          className={clsx(
            value > rating ? "text-yellow-400" : "text-gray-300",
            "h-5 w-5 shrink-0"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  </div>
);

Stars.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  labelPosition: PropTypes.string,
};

Stars.defaultProps = {
  value: 1,
  label: null,
  labelPosition: "top",
};

export default Stars;
