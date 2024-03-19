import React from "react";
import { Link, useLocation } from 'react-router-dom';

export default () => (
  <nav>
    <div className="header">
      <Link
        to="/"
        className={"header-btn " + (useLocation().pathname == '/' ? 'active' : '')}
        role="button"
      >
        Play Game
      </Link>
      <Link
        to="/leaderboard"
        className={"header-btn " + (useLocation().pathname == '/' ? '' : 'active')}
        role="button"
      >
        Leaderboard
      </Link>
    </div>
  </nav>
);