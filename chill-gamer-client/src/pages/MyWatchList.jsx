import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";

const MyWatchList = () => {
  const { watchList, loading } = useContext(AuthContext);
  const [watchLists, setWatchLists] = useState([]);

  useEffect(() => {
    if (watchList) {
      setWatchLists(watchList);
    }
  }, [watchList]);

  const handleDelete = (watchListId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/watchList/${watchListId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Removed!", "Removed from watchlist", "success");

              setWatchLists(
                watchLists.filter((watchList) => watchList._id !== watchListId)
              );
            }
          });
      }
    });
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
      <h2 className="text-2xl font-bold mb-4">My WatchList</h2>
      {watchLists?.length > 0 ? (
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
              {watchLists.map((watchList, index) => (
                <tr key={watchList._id}>
                  <td className="border border-white px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-white px-4 py-2 text-center">
                    {watchList.title}
                  </td>
                  <td className="border border-white px-4 py-2 text-center">
                    {watchList.genre}
                  </td>
                  <td className="border border-white px-4 py-2 text-center">
                    {watchList.rating}
                  </td>
                  <td className="border border-white px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(watchList._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Remove From WatchList
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Game found in WatchList.</p>
      )}
    </div>
  );
};

export default MyWatchList;
