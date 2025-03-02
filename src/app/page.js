"use client";

import Guess from "../components/Guess/Guess";
import Leaderboard from "..//components/leaderboard/Leaderboard";
import { useSelector } from "react-redux";

export default function Home() {
  const { places, loading } = useSelector((state) => state.places);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center md:items-start justify-center text-white px-4 md:px-10">
      <div className="w-full md:w-3/4 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-6 drop-shadow-lg text-center md:text-left">
          🌍 Globetrotter 🌍
        </h1>
        <p className="text-lg mb-4 text-center md:text-left max-w-lg">
          Solve clues, guess famous places, and unlock fun facts! Ready to test
          your geography skills?
        </p>

        {loading ? (
          <h2 className="text-xl font-semibold animate-pulse">Loading places...</h2>
        ) : (
          <Guess />
        )}
      </div>

      <div className="w-full md:w-1/4 mt-10 md:mt-0 md:ml-6">
        <Leaderboard />
      </div>
    </div>
  );
}
