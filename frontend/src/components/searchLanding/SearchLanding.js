import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import Search from "../search/Search";

const SearchLanding = () => {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();

  const search = ({ address }) => {
    navigate({
      pathname: "properties",
      search: queryString.stringify({
        address,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit(search)} className="flex w-full gap-x-4">
      <Controller
        control={control}
        name="address"
        render={({ field: { ref, ...field } }) => (
          <Search variant="blur" {...field} />
        )}
      />

      <button
        type="submit"
        className="rounded-md bg-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      >
        Search
      </button>
    </form>
  );
};

export default SearchLanding;
