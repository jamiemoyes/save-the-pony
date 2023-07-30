import classNames from "./GameBoard.module.css";
import { useEffect } from "react";
import { GameStateResponse } from "../../shared/types";

interface GameBoardProps {
  gameDetails: GameStateResponse;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameDetails }) => {
  const [ponyLocation] = gameDetails.pony;
  const [domokun] = gameDetails.domokun;
  const [endPoint] = gameDetails["end-point"];

  useEffect(() => {
    document.body.style.setProperty(
      "--game-board-width",
      `${gameDetails.size[0]}`
    );
    document.body.style.setProperty(
      "--game-board-height",
      `${gameDetails.size[1]}`
    );
  }, [gameDetails]);

  function getCharacterIdentifier(location: number) {
    if (location === ponyLocation)
      return (
        <span role="img" aria-label={`The pony is at location ${location}`}>
          🐎
        </span>
      );
    if (location === domokun)
      return (
        <span role="img" aria-label={`The domokun is at location ${location}`}>
          🧌
        </span>
      );
    if (location === endPoint)
      return (
        <span
          role="img"
          aria-label={`The end point is at location ${location}`}
        >
          🚪
        </span>
      );

    return "";
  }

  return (
    <div className={classNames.boardContainer}>
      <div className={classNames.gameBoard}>
        {gameDetails.data.map((cellBorders, index) => (
          <div
            key={index}
            className={`${classNames.boardCell} ${cellBorders
              .map((val) => classNames[`cell-border-${val}`])
              .join(" ")}`}
          >
            {getCharacterIdentifier(index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export { GameBoard };
