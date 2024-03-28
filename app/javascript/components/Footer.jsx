import React from "react";
import { Link, useLocation } from 'react-router-dom';

export default () => (
  <footer>
    {useLocation().pathname == '/' ?
    <div className="footer">
      <div className="footer-score">
        <div className="remaining-score">Remaining 3/3</div>
        <div className="remaining-time">Time 0</div>
      </div>
      <div className="footer-btns">
        <button className="footer-btn give-up">Give up</button>
      </div>
    </div>
     : 
    <div className="footer">
      <div className="footer-current-user">acjk20303</div>
      <div className="footer-user-rank">Rank: 5</div>
      <div className="footer-user-score">Score: 1000</div>
    </div>}
  </footer>
);