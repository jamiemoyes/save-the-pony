import { useQuery } from "@tanstack/react-query";
import { apiUrls } from "../shared/apiUrls";
import { GameStateResponse } from "../shared/types";

const GAME_STATE_QUERY_KEY = "game_state";

export const useGetGameState = (mazeId: string) =>
  useQuery({
    queryKey: [GAME_STATE_QUERY_KEY, mazeId],
    queryFn: (): Promise<GameStateResponse> =>
      fetch(apiUrls.maze.getMazeState(mazeId)).then((res) => res.json()),
  });
