import React, { useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

export default () => {
  const level1 = useRef(null);
  const startBtn = useRef(null);
  function changeGameStatus() {
    if (startBtn) {
      if (startBtn.current.classList[1] == "enabled") {
        startBtn.current.classList.replace("enabled", "disabled");
        level1.current.src = "images/Where-is-waldo-1.png";
      }
    }
  }
  return (
    <main>
    {useLocation().pathname == '/' ?
    <>
      <button ref={startBtn} className="start-btn enabled" onClick={changeGameStatus}>PRESS START</button>
      <div className="image">
        <img ref={level1} src={""} height="720" width="1280" alt="level 1 image" />
      </div>

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
