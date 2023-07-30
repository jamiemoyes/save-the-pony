import { useQueryClient } from "@tanstack/react-query";
import { useGetGameState } from "../../hooks";
import { useSendDirection } from "../../hooks/useSendDirection";
import ControlButton from "../ControlButton/ControlButton";
import GameBoard from "../GameBoard/GameBoard";
import GameOver from "../GameOver/GameOver";
import { GamePad } from "../GamePad/GamePad";
import { Direction, GameState, State } from "../../shared/types";
import classes from "./Game.module.css";
import { Reload } from "../../assets/icons";
interface GameProps {
  mazeId: string;
  restartGame: () => void;
}

const Game: React.FC<GameProps> = ({ mazeId, restartGame }) => {
  const queryClient = useQueryClient();
  const { data: gameDetails } = useGetGameState(mazeId);

  function invalidateGameBoard(response: GameState) {
    if (response.state === State.Active) {
      // Co-ordinates have now changes so current board is invalid, invalidating on react-query trigger
      // a refetch of the new updated board
      queryClient.invalidateQueries({ queryKey: ["game-state", mazeId] });
    }
  }

  const { mutate: sendDirection, data: gameState } = useSendDirection(
    mazeId,
    invalidateGameBoard
  );

  function handleMoveCharacter(direction: Direction) {
    sendDirection(direction);
  }

  if (!gameDetails) return null;

  const gameEnded = gameState && gameState.state !== State.Active;

  const RestartButton = () => (
    <ControlButton onClick={restartGame}>
      Restart <Reload />
    </ControlButton>
  );

  return (
    <div className={classes.gameContainer}>
      {gameEnded ? (
        <GameOver {...gameState}>
          <RestartButton />
        </GameOver>
      ) : (
        <>
          <GameBoard gameDetails={gameDetails} />
          <div className={classes.controlSection}>
            <GamePad onDirectionClick={handleMoveCharacter} />
            <div className={classes.gameStateControls}>
              <RestartButton />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { Game };
