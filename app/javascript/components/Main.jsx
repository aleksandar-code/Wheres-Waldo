import React, { useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

export default () => {
  const level1 = useRef(null);
  const startBtn = useRef(null);
  const dropDownDom = useRef(null);

  function changeGameStatus() {
    if (startBtn) {
      if (startBtn.current.classList[1] == "enabled") {
        startBtn.current.classList.replace("enabled", "disabled");
        level1.current.src = "images/Where-is-waldo-1.png";
      }
    }
  }

  function dropDown(e) {
    if (dropDownDom) {
      const xPos = e.pageX;
      const yPos = e.pageY;
      if (dropDownDom.current.classList[1] == "disabled"){
      dropDownDom.current.classList.replace("disabled", "enabled");
      console.log(xPos, yPos);
      dropDownDom.current.style.top = yPos - 110 + "px" ;
      dropDownDom.current.style.left = xPos + 16 + "px";
      } 
    else {
      console.log(xPos, yPos)
      dropDownDom.current.style.top = yPos - 110 + "px" ;
      dropDownDom.current.style.left = xPos + 16 + "px";
      console.log(e.target.localName);
      }
    }
  }

  window.addEventListener("click", (e) => {
    if (dropDownDom) {
      if (dropDownDom.current.classList[1] == "enabled" && e.target.localName !== "img") {
        console.log(e.target.localName);
        dropDownDom.current.classList.replace("enabled", "disabled");
      }
    }
  });

  return (
    <main>
    {useLocation().pathname == '/' ?
    <>
      <button ref={startBtn} className="start-btn enabled" onClick={changeGameStatus}>PRESS START</button>
      <div className="image">
        <div ref={dropDownDom} className="drop-down disabled">hello</div>
        <img ref={level1} src={" "} height="720" width="1280" alt="" onClick={dropDown} draggable="false" style={{ userSelect: "none" }}/>
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
