import { useQuery } from "@tanstack/react-query";
import { apiUrls } from "../apiUrls";
import { GameStateResponse } from "../shared/types";

export const useGetGameState = (mazeId: string) =>
  useQuery({
    queryKey: ["game-state", mazeId],
    queryFn: (): Promise<GameStateResponse> =>
      fetch(apiUrls.maze.getMazeState(mazeId)).then((res) => res.json()),
  });
