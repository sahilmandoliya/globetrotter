import { useEffect } from "react"

const Scoreboard = ({score}) => {

  return (
    <div className='scoreboardContainer'>
        <h1>Scoreboard</h1>
        <div>Highest Score: </div>
        <div>
            <h2>Correct Answers: {score.correct}</h2>
            <h2>Wrong Answers: {score.wrong}</h2>
        </div> 
    </div>
  )
}

export default Scoreboard