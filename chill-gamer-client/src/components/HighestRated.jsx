import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HighestRatedGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/highestRated")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) =>
        console.error("Failed to fetch highest rated games:", err)
      );
  }, []);

  return (
    <section className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Highest Rated Games
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div key={game._id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={game.coverUrl}
              alt={game.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{game.title}</h3>
            <p className="text-sm text-gray-600">Genre: {game.genre}</p>
            <p className="text-sm text-gray-600">Rating: {game.rating}</p>
            <p className="text-sm mt-2">{game.description.slice(0, 100)}...</p>
            <Link to={`/review/${game._id}`}>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Explore Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HighestRatedGames;
