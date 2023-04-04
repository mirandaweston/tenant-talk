import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Search from "../search/Search";

const SearchValidate = ({
  onChange,
  value,
  foundPropertyId,
  setFoundPropertyId,
}) => {
  const [, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const getProperty = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("/property", {
        params: { address: value },
      });
      if (data.property) {
        setFoundPropertyId(data.property._id);
      } else {
        setFoundPropertyId(false);
      }
    } catch (err) {
      setError(err.response.data.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (value) {
      getProperty();
    } else {
      setFoundPropertyId(null);
    }
  }, [value]);

  return (
    <Search
      onChange={onChange}
      value={value}
      foundPropertyId={foundPropertyId}
      isLoading={isLoading}
      label
    />
  );
};

SearchValidate.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  foundPropertyId: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setFoundPropertyId: PropTypes.func,
};

SearchValidate.defaultProps = {
  value: null,
  onChange: null,
  foundPropertyId: null,
  setFoundPropertyId: null,
};

export default SearchValidate;
