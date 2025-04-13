import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const MyReviews = () => {
  const { userReview, loading } = useContext(AuthContext);

  const handleDelete = (reviewId) => {
    // Implement delete logic here
    console.log("Delete review:", reviewId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2A2438]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
      {userReview?.length > 0 ? (
        <div className="overflow-x-auto rounded-box border-0 border-base-content/5 bg-[#DBD8E3] ">
          <table className="table">
            <thead>
              <tr className="bg-[#5c5470] text-white text-lg text-center">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Genre</th>
                <th className="border px-4 py-2">Rating</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userReview.map((review, index) => (
                <tr key={review._id}>
                  <td className="border border-white px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-white px-4 py-2 text-center">
                    {review.title}
                  </td>
                  <td className="border border-white px-4 py-2 text-center">
                    {review.genre}
                  </td>
                  <td className="border border-white px-4 py-2 text-center">
                    {review.rating}
                  </td>
                  <td className="border border-white px-4 py-2 text-center">
                    <Link
                      to={`/updateReview/${review._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 inline-block"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default MyReviews;
