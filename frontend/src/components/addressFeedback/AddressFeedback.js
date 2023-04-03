import React from "react";
import { PlusCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

const AddressFeedback = ({ isLoading, foundPropertyId }) => {
  if (isLoading)
    return (
      <svg
        className="h-5 w-5 animate-spin text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

  if (foundPropertyId == null) return;

  if (foundPropertyId)
    return <CheckCircleIcon className="h-6 w-6 text-green-500" />;

  if (!foundPropertyId)
    return <PlusCircleIcon className="h-6 w-6 text-blue-500" />;
};

AddressFeedback.propTypes = {
  isLoading: PropTypes.bool,
  foundPropertyId: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

AddressFeedback.defaultProps = {
  isLoading: false,
  foundPropertyId: null,
};

export default AddressFeedback;
