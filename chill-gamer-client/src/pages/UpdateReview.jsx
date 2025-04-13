import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateReview = () => {
  const review = useLoaderData();
  //const navigate = useNavigate();

  const [formData, setFormData] = useState({
    coverUrl: review.coverUrl,
    title: review.title,
    description: review.description,
    rating: review.rating,
    year: review.year,
    genre: review.genre,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/reviews/${review._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Changes Saved",
            icon: "success",
            confirmButtonText: "OK",
          });
          // alert("Review updated successfully!");
          // navigate("/myReviews");
        } else {
          alert("No changes were made.");
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update review.");
      });
  };

  return (
    <div className=" bg-[#5C5470] min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#352F44]  rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold mb-6 text-white text-center">
          Update Your Review
        </h2>
        <div className="text-center">
          <img
            src={formData.coverUrl}
            alt="Uploaded preview"
            className="mx-auto rounded-lg max-h-60 object-cover border-4 border-[#5C5470]"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverUrl"
              value={formData.coverUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded bg-[#DBD8E3] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Game Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded  bg-[#DBD8E3] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-white">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded  bg-[#DBD8E3] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-white">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="0"
                max="10"
                className="w-full p-3 border border-gray-300 rounded  bg-[#DBD8E3] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-white">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded  bg-[#DBD8E3] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-white">
                Genre
              </label>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded  bg-[#DBD8E3] focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded transition duration-200"
            >
              Update Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateReview;
