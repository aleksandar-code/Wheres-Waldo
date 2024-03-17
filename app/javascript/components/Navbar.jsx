import React from "react";
import { Link } from 'react-router-dom';

export default () => (
  <nav>
    <div className="header">
      <button className={"header-btn " + (window.location.pathname == '/' ? 'active' : '')}>Play Game</button>
      <button className={"header-btn " + (window.location.pathname == '/' ? '' : 'active')}>Leaderboard</button>
    </div>
  </nav>
);