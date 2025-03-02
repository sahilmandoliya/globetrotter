"use client";

import { Utils } from "../../utils/Utils";
import { fetchPlaces } from "../../redux/slices/placesSlices";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Scorecard from "../scorecard/Scorecard";
import Question from "../question/Question";

const Guess = () => {
  const { places, loading } = useSelector((state) => state.places);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [playedPlaces, setPlayedPlaces] = useState(new Set());
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [username, setUsername] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [inviteMessage, setInviteMessage] = useState(""); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (!places || places.length === 0) {
      dispatch(fetchPlaces());
    }
  }, [dispatch, places]);

  const handleUsernameSubmit = () => {
    if (username.trim() === "") {
      alert("Please enter a valid username.");
      return;
    }
    setShowPopup(false);
    startGame();
  };

  const startGame = () => {
    if (!places || places.length === 0) {
      alert("Places data is not loaded yet. Please wait!");
      return;
    }

    if (playedPlaces.size >= places.length) {
      alert("You've guessed all places! Restarting game...");
      setPlayedPlaces(new Set());
      setGameStarted(false);
      return;
    }

    let availablePlaces = places
      .map((_, index) => index)
      .filter((i) => !playedPlaces.has(i));

    const randomIndex =
      availablePlaces[Math.floor(Math.random() * availablePlaces.length)];
    const correctAnswer = places[randomIndex].city;

    let options = new Set([correctAnswer]);
    while (options.size < 4) {
      const rand = Math.floor(Math.random() * places.length);
      if (rand !== randomIndex) {
        options.add(places[rand].city);
      }
    }

    setPlayedPlaces(new Set([...playedPlaces, randomIndex]));
    setCurrentPlace(places[randomIndex]);
    setCurrentOptions(Utils.shuffleArray([...options]));
    setGameStarted(true);
  };

  const updateScore = (isCorrect, usedHint) => {
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? (usedHint ? 0.5 : 1) : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
    }));
  };

  // Invite Friend Functionality
  const handleInvite = () => {
    if (!username) {
      alert("Please enter your username before inviting friends!");
      return;
    }

    const inviteLink = `${window.location.origin}/game?invitedBy=${encodeURIComponent(username)}`;
    navigator.clipboard.writeText(inviteLink);
    setInviteMessage("Invite link copied! Share it with your friends.");
    setTimeout(() => setInviteMessage(""), 3000); // Reset message after 3 sec
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Scorecard score={score} username={username} />

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black w-80">
            <h2 className="text-xl font-bold mb-4">Enter Your Username</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your username"
            />
            <button
              onClick={handleUsernameSubmit}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Start Game
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <h2 className="text-xl font-semibold">Loading places...</h2>
      ) : gameStarted ? (
        <div>
          {currentPlace && (
            <Question
              place={currentPlace}
              options={currentOptions}
              updateScore={updateScore}
              onNext={startGame}
            />
          )}
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Globetrotter</h1>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Start Game
          </button>
        </div>
      )}

      {/* Invite Friend Section */}
      <button
        onClick={handleInvite}
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Invite Friend
      </button>
      {inviteMessage && (
        <p className="mt-2 text-green-600 font-semibold">{inviteMessage}</p>
      )}
    </div>
  );
};

export default Guess;
