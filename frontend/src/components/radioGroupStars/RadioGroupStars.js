import React from "react";
import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import PropTypes from "prop-types";

const RadioGroupStars = ({ value, onChange, label, labelPosition }) => {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className={labelPosition === "side" ? "flex space-x-2" : "space-y-1"}
    >
      <RadioGroup.Label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </RadioGroup.Label>
      <div className="flex w-fit flex-row-reverse">
        {[5, 4, 3, 2, 1].map((item) => (
          <RadioGroup.Option
            key={item}
            value={item}
            className={clsx(
              "peer flex-1 cursor-pointer text-gray-200 hover:text-yellow-400 peer-hover:text-yellow-300",
              value >= item && "text-yellow-400"
            )}
          >
            <RadioGroup.Label as={StarIcon} className="h-5 w-5 shrink-0" />
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

RadioGroupStars.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelPosition: PropTypes.string,
};

RadioGroupStars.defaultProps = {
  value: 1,
  onChange: null,
  label: "Label",
  labelPosition: "top",
};

export default RadioGroupStars;
