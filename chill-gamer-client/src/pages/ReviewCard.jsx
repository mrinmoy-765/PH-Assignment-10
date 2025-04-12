import React from "react";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
  const { _id, coverUrl, title, description, rating, genre, name } = review;

  return (
    <div
      className="max-w-sm rounded-2xl overflow-hidden shadow-lg p-4 transition-transform duration-200 hover:scale-105"
      style={{ backgroundColor: "#2A2438", color: "#DBD8E3" }}
    >
      <img
        className="w-full h-48 object-cover rounded-md mb-4"
        src={coverUrl}
        alt={title}
      />
      <div className="mb-2">
        <h2 className="text-xl font-bold text-[#DBD8E3]">{title}</h2>
        <p className="text-sm text-[#DBD8E3] italic">by {name}</p>
      </div>
      <p className="text-sm text-[#DBD8E3] mb-2 line-clamp-3">{description}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="bg-[#352F44] px-2 py-1 rounded text-xs">
          Genre: {genre}
        </span>
        <span className="bg-[#5C5470] px-2 py-1 rounded text-xs">
          ⭐ {rating}
        </span>
      </div>
      <Link
        to={`/review/${_id}`}
        className="inline-block text-center w-full bg-[#5C5470] hover:bg-[#352F44] text-white font-semibold py-2 px-4 rounded-md transition duration-200"
      >
        Explore Details
      </Link>
    </div>
  );
};

export default ReviewCard;
