import { useMutation } from "@tanstack/react-query";
import { apiUrls } from "../apiUrls";
import { Direction, GameState } from "../shared/types";

//TODO check if we can update game state via react query mutationKey
export const useSendDirection = (
  mazeId: string,
  onSuccess: (data: GameState) => void
) =>
  useMutation({
    onSuccess,
    mutationFn: (direction: Direction): Promise<GameState> =>
      fetch(apiUrls.maze.getMazeState(mazeId), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ direction }),
      }).then((res) => res.json()),
  });
