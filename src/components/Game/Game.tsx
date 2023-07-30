import { useQueryClient } from "@tanstack/react-query";
import { useGetGameState } from "../../hooks";
import { useSendDirection } from "../../hooks/useSendDirection";
import ControlButton from "../ControlButton/ControlButton";
import GameBoard from "../GameBoard/GameBoard";
import GameOver from "../GameOver/GameOver";
import { GamePad } from "../GamePad/GamePad";
import { Direction, GameState, State } from "../../shared/types";

interface GameProps {
  mazeId: string;
  restartGame: () => void;
}

const Game: React.FC<GameProps> = ({ mazeId, restartGame }) => {
  const queryClient = useQueryClient();
  const { data: gameDetails } = useGetGameState(mazeId);

  function invalidateGameBoard(response: GameState) {
    if (response.state === State.Active) {
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

  if (gameState && gameState.state !== State.Active) {
    return <GameOver {...gameState} />;
  }

  return (
    <div>
      <GameBoard gameDetails={gameDetails} />
      <GamePad onDirectionClick={handleMoveCharacter} />
      <ControlButton onClick={() => {}}>Restart</ControlButton>
      <ControlButton onClick={restartGame}>Exit</ControlButton>
    </div>
  );
};

export { Game };
