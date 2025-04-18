import React, { useContext } from "react";
import Banner from "../components/Banner";
import { AuthContext } from "../providers/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";
import HighestRatedGames from "../components/HighestRated";

const Home = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#2A2438]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <Banner></Banner>
      <HighestRatedGames></HighestRatedGames>
    </div>
  );
};

export default Home;
