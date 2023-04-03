import React from "react";
import { Switch } from "@headlessui/react";
import clsx from "clsx";
import PropTypes from "prop-types";

const Toggle = ({ value, onChange, label }) => {
  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <span className="flex flex-grow flex-col">
        <Switch.Label
          as="span"
          className="text-sm font-medium text-gray-900"
          passive
        >
          {label}
        </Switch.Label>
      </span>
      <Switch
        checked={value}
        onChange={onChange}
        className={clsx(
          value ? "bg-orange-500" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            value ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </Switch.Group>
  );
};

Toggle.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

Toggle.defaultProps = {
  onChange: null,
  label: "Label",
};

export default Toggle;
