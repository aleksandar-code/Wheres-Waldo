import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate} from 'react-router-dom';

export default () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);
  useEffect(() => {
    const url = "/api/v1/levels/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setLevels(res))
      .catch(() => navigate("/"));
  }, []);
  
  const level1 = useRef(null);
  const startBtn = useRef(null);
  const dropDownDom = useRef(null);

  function changeGameStatus() {
    if (startBtn) {
      if (startBtn.current.classList[1] == "enabled") {
        startBtn.current.classList.replace("enabled", "disabled");
        level1.current.src = levels[0][0].image;
        level1.current.style.display = "initial";
        window.addEventListener("click", (e) => {
          if (dropDownDom.current != null) {
            if (dropDownDom.current.classList[1] == "enabled" && e.target.localName !== "img") {
              console.log(e.target.localName);
              dropDownDom.current.classList.replace("enabled", "disabled");
            }
          }
        });
      }
    }
  }

  function dropDown(e) {
    if (dropDownDom) {
      const rect = level1.current.getBoundingClientRect(); 
      const xPos = e.clientX - rect.left;
      const yPos = e.clientY - rect.top;

      if (dropDownDom.current.classList[1] == "disabled"){
        dropDownDom.current.classList.replace("disabled", "enabled")
        dropDownDom.current.style.left = xPos + "px";
        dropDownDom.current.style.top = yPos + "px";
      } 
    else {
      dropDownDom.current.style.left = xPos + "px";
      dropDownDom.current.style.top = yPos + "px";
      }
    }
  }
  
  return (
    <main>
    {useLocation().pathname == '/' ?
    <>
      <button ref={startBtn} className="start-btn enabled" onClick={changeGameStatus}>PRESS START</button>
      <div className="image">
        <div ref={dropDownDom} className="drop-down disabled" draggable="false" style={{ userSelect: "none" }}>
          {levels.length > 1 ?
          <>
            {levels[1].map((character) => (
              <li key={character.id}>{character.name}</li>
            ))}
          </>
        : "Loading"}
          
        </div>
        <img ref={level1} src={" "} height="720" width="1280" alt="" onClick={dropDown} draggable="false" style={{ userSelect: "none", display: "none" }}/>
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
