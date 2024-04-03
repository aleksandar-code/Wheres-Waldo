import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate} from 'react-router-dom';
import LeaderboardInput from "./LeaderboardInput";

export default () => {
  const [leaderboards, setLeaderboards] = useState([]);
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);
  const [box, setBoxes] = useState();
  const [xy, setXy] = useState({x: 0, y: 0});
  const level1 = useRef(null);
  const startBtn = useRef(null);
  const dropDownDom = useRef(null);
  const correctMarker = useRef(null);
  const incorrectMarker = useRef(null);
  const [foundNumber, setFoundNumber] = useState(0)
  // refactor api calls

  const apiCall = (url, setState) => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setState(res))
      .catch(() => navigate("/"));
  }

  const verifyUserGuess = (xPos, yPos, characterName) => {
    const url = "/api/v1/characters/guess-output?" + 
    `xyzguess[x]=${xPos}&xyzguess[y]=${yPos}&xyzguess[character]=${characterName}`;
    apiCall(url, setBoxes);
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
        setXy({x: xPos, y: yPos});
        console.log(xPos, yPos);
      } 
    else {
      dropDownDom.current.style.left = xPos + "px";
      dropDownDom.current.style.top = yPos + "px";
      setXy({x: xPos, y: yPos});
      console.log(xPos, yPos);
      }
    }
  }
  
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


  if (useLocation().pathname == '/')
  {
    useEffect(() => {
      console.log(box)
      if (box && box["gameEnd"] == true) {
        correctFeedback(xy["x"], xy["y"]);
        updateFoundFeedback();
        if (box["highscore"] == true) {
          const div = document.querySelector(".input-username");
          div.classList.replace("disabled", "enabled");

          const imageDiv = document.querySelector(".image");
          imageDiv.style.pointerEvents = "none"
          document.querySelector("#score").textContent = box["score"]
        }
        else {
          location.reload(true);
        }
      }

      else if (box && box["answer"] == "yes") {
        console.log(box["characterName"]);
        levels[1].forEach(element => {
          if (element.name == box["characterName"] && element.found != true) {
            element.found = true;
            correctFeedback(xy["x"], xy["y"]);
            updateFoundFeedback();
          }
        });
      }
      else if (box) {
        console.log("no");
        incorrectFeedback(xy["x"], xy["y"]);
      }
    }, [box])

    useEffect(() => {
      const foundCharacters = window.document.querySelector(".footer-score");
      if (foundCharacters)
      foundCharacters.textContent = "Found Characters " + `${foundNumber}/3`;
      console.log("FOUND CHARACTER", foundNumber);
    }, [foundNumber]);


    useEffect(() => {
      const url = "/api/v1/levels/index";
      apiCall(url, setLevels)
    }, []);
    
    function correctFeedback(x, y) {
      if (correctMarker) {
        correctMarker.current.classList.replace("disabled", "enabled");
        incorrectMarker.current.classList.replace("enabled", "disabled");
        correctMarker.current.style.left = x + "px";
        correctMarker.current.style.top = y + "px";
      }
    }

    function incorrectFeedback(x, y) {
      if (incorrectMarker) {
        incorrectMarker.current.classList.replace("disabled", "enabled");
        correctMarker.current.classList.replace("enabled", "disabled");
        incorrectMarker.current.style.left = x + "px";
        incorrectMarker.current.style.top = y + "px";
      }
    }

    function updateFoundFeedback() {
      setFoundNumber(foundNumber + 1);
    }
  
  }
  else {
    useEffect(() => {
      const url = "/api/v1/leaderboard/index";
      apiCall(url, setLeaderboards)
    }, []);
  }

  return (
    <main>
    {useLocation().pathname == '/' ?
    <>
      <button ref={startBtn} className="start-btn enabled" onClick={changeGameStatus}>PRESS START</button>
      <LeaderboardInput />
      <div className="image">
        <div ref={correctMarker} className="correct-marker disabled"></div>
        <div ref={incorrectMarker} className="incorrect-marker disabled"></div>
        <div ref={dropDownDom} className="drop-down disabled" draggable="false" style={{ userSelect: "none" }}>
          {levels.length > 1 ?
          <>
            {levels[1].map((character) => (
              <li key={character.id} onClick={(e) => {
                const characterName = e.target.textContent;
                console.log(xy);
                verifyUserGuess(xy["x"], xy["y"], characterName);
              }}>{character.name}</li>
            ))}
          </>
        : "Loading"}
          
        </div>
        <img ref={level1} src={" "} height="720" width="1280" alt="" onClick={dropDown} draggable="false" style={{ userSelect: "none", display: "none" }}/>
      </div>
    </> :
    <>
    { leaderboards.length > 1 ?
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
            <div>4</div>
            <div>5</div>
          </div>
          <div className="usernames">
            {leaderboards.map((player) => (
              <div key={player.id} onClick={() => {
              }}>{player.username}</div>
            ))}
          </div>
          <div className="scores">
            {leaderboards.map((player) => (
                <div key={player.id} onClick={() => {
                }}>{player.score}</div>
            ))}
          </div>
        </div>
      </div>
      : "Loading"
    }
    </>}
  </main>
  );
};
