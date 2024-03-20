import React, { useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom';


export default () => {

  const gameStatus = useRef(null);
  const startBtn = useRef(null);
  function changeGameStatus() {
    if (gameStatus) {
      console.log(gameStatus.current.classList[1]);
      if (gameStatus.current.classList[1] == "disabled") {
        gameStatus.current.classList.replace("disabled", "enabled");
        console.log(gameStatus.current.classList[1]);
        startBtn.current.classList.replace("enabled", "disabled")
        console.log(startBtn.current.classList[1]);
      }
    }

  }
  return (
    <main>
    {useLocation().pathname == '/' ?
    <>
      <button ref={startBtn} className="start-btn enabled" onClick={changeGameStatus}>PRESS START</button>
      <div ref={gameStatus} className="image disabled"></div>
    </> :
    <>
      <div className="leaderboard">
        <div className="leaderboard-titles">
          <div>Rank</div>
          <div>User</div>
          <div>Score</div>
        </div>
        <div className="leaderboard-data">
          <div className="rank">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>

          <div className="usernames">
            <div>lolou</div>
            <div>oeuheo</div>
            <div>oesuaoeu</div>
          </div>
          <div className="scores">
            <div>1000</div>
            <div>2323</div>
            <div>3323</div>
          </div>
        </div>
      </div>
    </>}
  </main>
  );
};
