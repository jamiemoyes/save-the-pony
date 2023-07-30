import { apiUrls } from "../../apiUrls";
import { GameState, State } from "../../shared/types";

const GameOver: React.FC<GameState> = ({
  "state-result": stateResult,
  state,
  "hidden-url": hiddenUrl,
}) => {
  const title = state === State.Won ? "You won!" : "Game over";
  return (
    <div>
      <h1>{title}</h1>
      <p>{stateResult}</p>
      {hiddenUrl && <img src={apiUrls.image(hiddenUrl)} />}
    </div>
  );
};

export default GameOver;
