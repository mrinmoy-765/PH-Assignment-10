import React, { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";

const AddReview = () => {
  const { mongoUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    coverUrl: "",
    title: "",
    description: "",
    rating: "",
    year: "",
    genre: "",
  });

  const genres = ["Action", "RPG", "Adventure"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = {
      ...formData,
      rating: Number(formData.rating),
      year: Number(formData.year),
      email: mongoUser?.email,
      name: mongoUser?.name,
    };

    console.log("Submitting review:", review);

    try {
      const res = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Review submitted successfully!");
        setFormData({
          coverUrl: "",
          title: "",
          description: "",
          rating: "",
          year: "",
          genre: "",
        });
      } else {
        toast.error("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred while submitting.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 bg-[#5C5470] rounded-md">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        Add New Game Review
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-[#DBD8E3] shadow-md rounded p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Cover URL */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="md:w-40 text-[#210c5a]">Cover Image URL</label>
          <input
            type="url"
            name="coverUrl"
            placeholder="Game Cover Image URL"
            value={formData.coverUrl}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>

        {/* Title */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="md:w-40 text-[#210c5a] text-center">
            Game Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Game Title"
            value={formData.title}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2 flex flex-col md:flex-row items-start gap-2">
          <label className="md:w-40  mt-2 text-[#210c5a]  text-center">
            Write Review
          </label>
          <textarea
            name="description"
            placeholder="Review Description"
            value={formData.description}
            onChange={handleChange}
            className="input w-full h-28"
            required
          />
        </div>

        {/* Rating */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="md:w-40 text-[#210c5a]  text-center">
            Rating (1-10)
          </label>
          <input
            type="number"
            name="rating"
            min="1"
            max="10"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>

        {/* Year */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="md:w-40 text-[#210c5a]  text-center">
            Publishing Year
          </label>
          <input
            type="number"
            name="year"
            placeholder="Publishing Year"
            value={formData.year}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>

        {/* Genre */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="md:w-40 text-[#210c5a]  text-center">
            Choose Genre
          </label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="input w-full"
            required
          >
            <option value="">Select Genre</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* User Email */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="md:w-40 text-[#210c5a]  text-center">
            Your Email
          </label>
          <input
            type="email"
            value={mongoUser?.email || ""}
            readOnly
            className="input w-full bg-gray-100 text-gray-600 font-medium"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="md:w-40 text-[#210c5a]  text-center">
            Your Username
          </label>
          <input
            type="text"
            value={mongoUser?.name || ""}
            readOnly
            className="input w-full bg-gray-100 text-gray-600 font-medium"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Submit Review
          </button>

          {/* Toast Container */}
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </form>
    </div>
  );
};

export default AddReview;
