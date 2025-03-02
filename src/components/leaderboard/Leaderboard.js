"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLeaderboard } from "../../redux/slices/appSlice"; 

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { leaderboard, loading, error } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-2xl shadow-2xl w-96 text-white">
      <h2 className="text-2xl font-bold text-center mb-4">🏆 Leaderboard</h2>

      {loading ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-400">Error: {error}</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-500 text-lg">
              <th className="py-2">Rank</th>
              <th className="py-2">Player</th>
              <th className="py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard
                .slice()
                .sort((a, b) => b.score - a.score)
                .map((player, index) => {
                  let rankColor = "text-gray-300";
                  if (index === 0) rankColor = "text-yellow-400 font-bold";
                  else if (index === 1)
                    rankColor = "text-gray-300 font-semibold";
                  else if (index === 2)
                    rankColor = "text-orange-400 font-medium";

                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-700 text-center transition duration-200 hover:bg-gray-800"
                    >
                      <td className={`py-2 ${rankColor}`}>{index + 1}</td>
                      <td className="py-2">{player.username}</td>
                      <td className="py-2 font-bold text-blue-400">
                        {player.score}
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan="3" className="py-2 text-center text-gray-400">
                  No players yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
