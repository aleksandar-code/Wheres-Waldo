import React from "react";

export default () => (
  <div className="input-username disabled">
    <p>input your username for this score:</p>
    <div id="score"></div>
    <form action="/api/v1/leaderboard/create" method="post">
      <input id="username" name="leaderboard[username]" type="text" />
      <button type="submit">submit</button>
    </form>
  </div>
);