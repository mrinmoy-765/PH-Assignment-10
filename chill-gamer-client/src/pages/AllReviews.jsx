import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const AllReviews = () => {
  const loadedReviews = useLoaderData(); // Get initial data from loader
  const [reviews, setReviews] = useState(loadedReviews); // Store in state

  return (
    <div className="bg-[#544e75] min-h-screen py-4 px-4 sm:px-6 md:px-10 lg:px-20">
      <h1 className="text-lg font-medium flex justify-end place-items-end text-[#ffffff] mb-5 ">
        <p className="border-1 px-2.5 py-1 rounded">
          Total Reviews: {reviews.length}
        </p>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
