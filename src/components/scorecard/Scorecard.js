"use client";

const Scorecard = ({ score, username }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col w-72">
      {/* Username Display */}
      {username && (
        <div className="text-center text-gray-700 font-semibold mb-2">
          Player: <span className="text-blue-500">{username}</span>
        </div>
      )}

      {/* Score Section */}
      <div className="flex justify-between">
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-500">✅ Correct</h3>
          <p className="text-lg font-semibold text-green-500">{score.correct}</p>
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-500">❌ Wrong</h3>
          <p className="text-lg font-semibold text-red-500">{score.wrong}</p>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
