import React from "react";
import { Link, useLocation } from 'react-router-dom';

export default () => (
  <footer>
    {useLocation().pathname == '/' ?
    <div className="footer">
      <div className="footer-score">
        <div className="remaining-score">Remaining 2/2</div>
        <div className="remaining-time">Time 3:00/3:00</div>
      </div>
      <div className="footer-btns">
        <button className="footer-btn pause">Pause</button>
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