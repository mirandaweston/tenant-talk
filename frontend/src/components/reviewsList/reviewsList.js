import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "axios-hooks";
import useAuthContext from "../../hooks/useAuthContext";
import ReviewCard from "../reviewCard/reviewCard";

const propertyDetails = () => {
  const { id } = useParams();
  const { token } = useAuthContext();
  const [{ loading, data, error }] = useAxios({
    url: `/property/${id}`,
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data) return null; // change this dependent on if we need to return. Should page
  // be accessible if we haven't hit a property value in the previous path.

  return (
    <ul role="list" className="space-y-3">
      {data.property.reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </ul>
  );
};

export default propertyDetails;

