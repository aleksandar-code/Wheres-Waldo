import React from "react";

export default () => (
  <div className="input-username disabled">
    <p>input your username for this score:</p>
    <form action="/api/v1/leaderboard/create" method="post">
      <input id="username" name="username" type="text" />
      <input id="score" name="score" defaultValue="0" readOnly />
      <button type="submit">submit</button>
    </form>
  </div>
);