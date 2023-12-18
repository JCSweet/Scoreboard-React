import { useState } from "react";
import ScoreboardPlayer from "./ScoreboardPlayer";
import "./Scoreboard.css";
import { useMediaQuery } from "react-responsive";

export default function ScoreTracker() {
  const [scoreSheet, setScoreSheet] = useState([
    { id: crypto.randomUUID(), playerNumber: 1, playerName: "", score: 0 },
    { id: crypto.randomUUID(), playerNumber: 2, playerName: "", score: 0 },
  ]);

  const addScore = (id) => {
    setScoreSheet((priorScores) => {
      return priorScores.map((scores) => {
        if (scores.id === id) {
          return { ...scores, score: scores.score + 1 };
        }
        return scores;
      });
    });
  };

  const subtractScore = (id) => {
    setScoreSheet((priorScores) => {
      return priorScores.map((scores) => {
        if (scores.id === id) {
          return { ...scores, score: scores.score - 1 };
        }
        return scores;
      });
    });
  };

  const resetScore = () => {
    setScoreSheet((priorScores) => {
      return priorScores.map((scores) => {
        return { ...scores, score: 0 };
      });
    });
  };

  const newPlayerNumber = () => {
    for (let i = 1; i <= scoreSheet.length + 1; i++) {
      if (!scoreSheet.some((p) => p.playerNumber === i) && !isNaN(i)) {
        return i;
      }
    }
  };

  const sortPlayers = () => {
    setScoreSheet((priorScores) => {
      const playerOrder = [...priorScores];
      playerOrder.sort(
        (a, b) => Number(a.playerNumber) - Number(b.playerNumber)
      );
      return playerOrder;
    });
  };

  const newPlayer = () => {
    if (scoreSheet.length < 12) {
      setScoreSheet((priorScores) => {
        return [
          ...priorScores,
          {
            id: crypto.randomUUID(),
            playerNumber: newPlayerNumber(),
            playerName: "",
            score: 0,
          },
        ];
      });
    }
  };

  const addPlayer = () => {
    newPlayer();
    sortPlayers();
  };

  const deletePlayer = (id) => {
    setScoreSheet((priorScores) => {
      return priorScores.filter((p) => p.id !== id);
    });
  };

  const ScreenSize = () => {
    const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
    const isMediumScreen = useMediaQuery({ query: "(min-width: 500px)" });
    const isSmallScreen = useMediaQuery({ query: "(max-width: 500px)" });
    const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  };

  return (
    <div className="AppContainer">
      <div className="MainMenu">
        <div className="MainMenuHeader">
          <h1>Scoreboard</h1>
        </div>
        <div className="MainMenuButtons">
          <button onClick={addPlayer}>+ Player</button>
          <button onClick={resetScore}>Reset</button>
        </div>
      </div>
      <div className="PlayerBoard">
        {scoreSheet.map((scores) => (
          <ScoreboardPlayer
            key={scores.id}
            scores={scores}
            plusScore={addScore}
            minusScore={subtractScore}
            removePlayer={deletePlayer}
          />
        ))}
      </div>
    </div>
  );
}
