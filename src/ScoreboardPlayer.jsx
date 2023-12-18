import "./ScoreboardPlayer.css";
import { useState } from "react";

function randomChoice(ar) {
  const index = Math.floor(Math.random() * ar.length);
  return ar[index];
}
const colors = [
  "#E53935",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#FF9800",
  "#FF5722",
];

export default function ScoreTrackerPlayer({
  scores,
  plusScore,
  minusScore,
  removePlayer,
}) {
  const startColor = randomChoice(colors);
  const [bgColor, setBgColor] = useState(startColor);
  const changeColor = () => {
    setBgColor(randomChoice(colors));
  };

  return (
    <div
      className="PlayerCard"
      key={scores.id}
      style={{ backgroundColor: bgColor }}
    >
      <div className="PlayerCardMenu">
        <h3 onClick={() => changeColor()}>
          Player {scores.playerName === "" && scores.playerNumber}
        </h3>
        <button
          className="RemovePlayerButton"
          onClick={() => removePlayer(scores.id)}
        >
          X
        </button>
      </div>
      <div>
        <h2>{scores.score}</h2>
      </div>
      <div className="PlayerCardScoreButtons">
        <button onClick={() => minusScore(scores.id)}>-1</button>
        <button onClick={() => plusScore(scores.id)}>+1</button>
      </div>
    </div>
  );
}
