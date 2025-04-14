import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const ReviewDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const { firebaseUser, mongoUser } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReview(data))
      .catch((err) => console.error("Failed to fetch review:", err));
  }, [id]);

  const handleAddToWatchlist = () => {
    if (!firebaseUser) {
      Swal.fire("Please log in to add to watchlist.");
      return;
    }

    fetch(
      `http://localhost:5000/watchlist/check?userEmail=${mongoUser.email}&reviewId=${review._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.exists) {
          Swal.fire("Already in Watchlist!", "", "info");
        } else {
          const watchlistItem = {
            reviewId: review._id,
            title: review.title,
            coverUrl: review.coverUrl,
            rating: review.rating,
            genre: review.genre,
            description: review.description,
            reviewerName: review.name,
            reviewerEmail: review.email,
            userEmail: mongoUser.email,
            userName: mongoUser.name,
          };

          fetch("http://localhost:5000/watchlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(watchlistItem),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                Swal.fire("Added to Watchlist!", "", "success");
              } else {
                Swal.fire("Something went wrong!", "", "error");
              }
            });
        }
      })
      .catch((err) => {
        console.error("Watchlist check failed:", err);
        Swal.fire("Error checking watchlist", "", "error");
      });
  };

  if (!review) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#DBD8E3] rounded-lg shadow-lg mt-10">
      <img
        src={review.coverUrl}
        alt={review.title}
        className="w-full max-h-[400px] object-cover rounded-md mb-6"
      />
      <h2 className="text-3xl font-bold text-[#2A2438] mb-4">{review.title}</h2>
      <p className="text-[#352F44] mb-2">
        <strong>Genre:</strong> {review.genre}
      </p>
      <p className="text-[#352F44] mb-2">
        <strong>Rating:</strong> {review.rating}/10
      </p>
      <p className="text-[#5C5470] mb-4">{review.description}</p>
      <p className="text-sm text-[#352F44] mb-1">
        <strong>Reviewer:</strong> {review.name}
      </p>
      <p className="text-sm text-[#352F44] mb-6">
        <strong>Email:</strong> {review.email}
      </p>

      {firebaseUser && (
        <button
          onClick={handleAddToWatchlist}
          className="bg-[#2A2438] text-white px-6 py-2 rounded hover:bg-[#352F44] transition duration-200"
        >
          Add to WatchList
        </button>
      )}
    </div>
  );
};

export default ReviewDetails;
