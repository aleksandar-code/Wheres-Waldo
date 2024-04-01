import React from "react";

export default () => (
  <div className="input-username disabled">
    <p>input your username for this score:</p>
    <form action="/api/v1/leaderboard/setUserScore" method="post">
      <input type="text" />
      <button>submit</button>
    </form>
  </div>
);