import { useState } from "react";
import ScoreboardPlayer from "./ScoreboardPlayer";
import "./Scoreboard.css";
import { useMediaQuery } from "react-responsive";

export default function ScoreTracker() {
  const [scoreSheet, setScoreSheet] = useState([
    { id: crypto.randomUUID(), playerNumber: 1, playerName: "", score: 0 },
    { id: crypto.randomUUID(), playerNumber: 2, playerName: "", score: 0 },
  ]);

  // twoPlayer state used to change Flex-direction based on number of players for ideal layout
  const [twoPlayer, setTwoPlayer] = useState(true);

  // Modify Scores
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

  // JS Media Queries
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  // const isMediumScreen = useMediaQuery({ minWidth: 900, maxWidth: 1024 });
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isPortrait = useMediaQuery({ orientation: "portrait" });

  let maxPlayers = 4;

  if (isMediumScreen && isPortrait) {
    maxPlayers = 6;
  } else if (isLargeScreen) {
    maxPlayers = 8;
  }

  // Add Player
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
  };

  const addPlayer = () => {
    if (scoreSheet.length < maxPlayers) {
      if (scoreSheet.length >= 2) {
        setTwoPlayer(false);
        newPlayer();
        sortPlayers();
      } else {
        newPlayer();
        sortPlayers();
      }
    }
  };

  // Delete Player
  const deletePlayer = (id) => {
    setScoreSheet((priorScores) => {
      return priorScores.filter((p) => p.id !== id);
    });
  };

  const removePlayer = (id) => {
    if (scoreSheet.length <= 3) {
      setTwoPlayer(true);
      deletePlayer(id);
    }
    deletePlayer(id);
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
      <div
        className="PlayerBoard"
        style={{ flexDirection: twoPlayer ? "column" : "row" }}
      >
        {scoreSheet.map((scores) => (
          <ScoreboardPlayer
            key={scores.id}
            scores={scores}
            plusScore={addScore}
            minusScore={subtractScore}
            removePlayer={removePlayer}
          />
        ))}
      </div>
    </div>
  );
}
