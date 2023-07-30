import { useMutation } from "@tanstack/react-query";
import { apiUrls } from "../shared/apiUrls";
import { Direction, GameState } from "../shared/types";

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
