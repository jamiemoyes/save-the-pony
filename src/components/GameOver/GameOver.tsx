import { PropsWithChildren } from "react";
import { apiUrls } from "../../shared/apiUrls";
import { GameState, State } from "../../shared/types";
import classes from "./GameOver.module.css";

const GameOver: React.FC<GameState & PropsWithChildren> = ({
  "state-result": stateResult,
  state,
  "hidden-url": hiddenUrl,
  children,
}) => {
  const title = state === State.Won ? "You won!" : "Game over";
  return (
    <div className={classes.gameOverContainer}>
      {hiddenUrl && (
        <img
          src={apiUrls.image(hiddenUrl)}
          alt={`Image which shows that ${
            state === State.Won
              ? "you saved the pony"
              : "you were caught by the Domokun"
          }`}
        />
      )}
      <div className={classes.gameOverContent}>
        <div>
          <h1>{title}</h1>
          <p>{stateResult}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GameOver;
