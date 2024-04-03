import React from "react";
import { Link, useLocation } from 'react-router-dom';

export default (foundCharacters) => {
  
  return (
  <footer>
    {useLocation().pathname == '/' ?
    <div className="footer">
      <div className="footer-score">Found Characters 0/3</div>
    </div>
     : 
    <div className="footer">
      <Link
        to="/"
        className="header-btn"
        role="button"
      >
        Play Game
      </Link>
    </div>}
  </footer>
  )
};