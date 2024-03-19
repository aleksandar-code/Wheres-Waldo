import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

export default () => {

  return (
    <main>
      <div className="image"></div>
    {useLocation().pathname == '/' ?
    <>
      <button className="start-btn">PRESS START</button>
      <div className="image-placeholder"></div>
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
