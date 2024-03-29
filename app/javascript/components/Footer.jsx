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
      <div className="footer-current-user">acjk20303</div>
      <div className="footer-user-rank">Rank: 5</div>
      <div className="footer-user-score">Score: 1000</div>
    </div>}
  </footer>
  )
};