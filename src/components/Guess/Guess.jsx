"use client";
import {Utils} from "@/utils/Utils";
import { fetchPlaces } from "../../redux/slices/placesSlices";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Guess.css";
import Scorecard from "../scorecard/Scorecard";

const Guess = () => {
  const { places, loading } = useSelector((state) => state.places);
  const [currentPlace, setCurrentPlace] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [playedPlaces, setPlayedPlaces] = useState(new Set());
  const [secondClue, setSecondClue] = useState(false);
  const [score, setScore] = useState({correct: 0, wrong: 0});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaces());
  }, [dispatch]);

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
  
    let availablePlaces = places.map((_, index) => index).filter(i => !playedPlaces.has(i));
  
    if (availablePlaces.length === 0) {
      alert("All places have been played!");
      return;
    }
  
    const randomIndex = availablePlaces[Math.floor(Math.random() * availablePlaces.length)];
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

  const checkGuess=(option)=>{
    if(option===currentPlace.city){
      alert("Correct Answer");
      if(secondClue) setScore({...score, correct: score.correct+0.5});
      else setScore({...score, correct: score.correct+1});
      setSecondClue(false);
      startGame();
    }else{
      alert("Wrong Answer, we have given one more clue");
      setSecondClue(true);
    }
  }

  return (
    <div className="guessContainer">
      <Scorecard score={score} />
      {loading ? (
        <h2>Loading places...</h2>
      ) : gameStarted ? (
        <div>
          {currentPlace && (
            <div>
              <h1>{currentPlace?.clues[0]}</h1>
              {secondClue && <h2>{currentPlace?.clues[1]}</h2>}
              <div>
                {currentOptions.map((option, index) => (
                  <button className="optionBtn" key={option} onClick={()=>checkGuess(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="startGame">
          <h1>Globetrotter</h1>
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
    </div>
  );
};

export default Guess;
