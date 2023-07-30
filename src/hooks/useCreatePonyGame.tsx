import { useMutation } from "@tanstack/react-query";
import { apiUrls } from "../shared/apiUrls";

interface CreateGameMutationParams {
  mazeWidth: number;
  mazeHeight: number;
  mazePlayerName: string;
  difficulty: number;
}

interface CreateGameProps {
  onSuccess: (data: CreateGameResponse) => void;
}

export interface CreateGameResponse {
  maze_id: string;
}

export const useCreatePonyGame = ({ onSuccess }: CreateGameProps) =>
  useMutation({
    mutationFn: ({
      mazeWidth,
      mazeHeight,
      mazePlayerName,
      difficulty,
    }: CreateGameMutationParams): Promise<CreateGameResponse> =>
      fetch(apiUrls.maze.create, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "maze-width": mazeWidth,
          "maze-height": mazeHeight,
          "maze-player-name": mazePlayerName,
          difficulty,
        }),
      }).then(async (res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.json();
      }),
    onSuccess,
  });
