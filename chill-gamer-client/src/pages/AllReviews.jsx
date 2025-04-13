import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const AllReviews = () => {
  const loadedReviews = useLoaderData(); // Initial data from loader
  const [reviews, setReviews] = useState(loadedReviews);

  const handleSortChange = (value) => {
    const sorted = [...reviews];
    switch (value) {
      case "ratingAsc":
        sorted.sort((a, b) => a.rating - b.rating);
        break;
      case "ratingDesc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "yearAsc":
        sorted.sort((a, b) => a.year - b.year);
        break;
      case "yearDesc":
        sorted.sort((a, b) => b.year - a.year);
        break;
      default:
        return;
    }
    setReviews(sorted);
  };

  const handleGenreChange = (genre) => {
    if (genre === "") {
      setReviews(loadedReviews); // Reset to all if empty
    } else {
      const filtered = loadedReviews.filter((r) => r.genre === genre);
      setReviews(filtered);
    }
  };

  return (
    <div className="bg-[#544e75] min-h-screen py-4 px-4 sm:px-6 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-5">
        <h1 className="text-lg font-medium text-[#ffffff]">
          Total Reviews: {reviews.length}
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Sort Dropdown */}
          <select
            onChange={(e) => handleSortChange(e.target.value)}
            className="select select-bordered w-full sm:w-52"
          >
            <option value="">Sort By</option>
            <option value="ratingAsc">Rating (Low to High)</option>
            <option value="ratingDesc">Rating (High to Low)</option>
            <option value="yearAsc">Year (Old to New)</option>
            <option value="yearDesc">Year (New to Old)</option>
          </select>

          {/* Genre Dropdown */}
          <select
            onChange={(e) => handleGenreChange(e.target.value)}
            className="select select-bordered w-full sm:w-52"
          >
            <option value="">Filter by Genre</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="RPG">RPG</option>
            <option value="Simulation">Simulation</option>
            <option value="Strategy">Strategy</option>
            <option value="Sports">Sports</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
