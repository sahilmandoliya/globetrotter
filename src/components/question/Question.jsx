"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import useSound from "use-sound";

const Question = ({ place, options, updateScore, onNext }) => {
  const [hints, setHints] = useState([place.clues[0]]); 
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [playCorrect] = useSound("/assets/sounds/correct.mp3", { interrupt: true });
  const [playWrong] = useSound("/assets/sounds/wrong.mp3", { interrupt: true });


  useEffect(() => {
    setHints([place.clues[0]]);
    setSelectedAnswers([]);
    setIsCorrect(false);
  }, [place]);

  const checkGuess = (option) => {
    setSelectedAnswers((prev) => [...prev, option]);
    const correct = option === place.city;
    setIsCorrect(correct);

    if (correct) {
      playCorrect();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      updateScore(true, hints.length > 1);
    } else {
      playWrong();
      if (hints.length === 1) {
        setHints((prev) => [...prev, place.clues[1]]);
      }
      updateScore(false, false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-96 border border-gray-300">
      {showConfetti && <Confetti />}

      {hints.map((hint, index) => (
        <h2 key={index} className="text-xl font-semibold mb-2 text-gray-900">
          {hint}
        </h2>
      ))}

      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            className={`p-3 rounded-lg border-2 font-medium transition text-gray-900 ${
              selectedAnswers.includes(option)
                ? option === place.city
                  ? "border-green-500 bg-green-200"
                  : "border-red-500 bg-red-200"
                : "border-gray-300 bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => checkGuess(option)}
            disabled={selectedAnswers.includes(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {isCorrect && place.fun_fact && (
        <p className="mt-4 text-gray-700 italic">
          {place.fun_fact[Math.floor(Math.random() * place.fun_fact.length)]}
        </p>
      )}

      {isCorrect && (
        <button
          onClick={onNext}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Question;
