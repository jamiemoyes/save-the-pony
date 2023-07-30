import { rest } from "msw";
import { apiUrls } from "../shared/apiUrls";
import { gameMocks } from "./gameDetailsMock";

const { gameDetails, gameState } = gameMocks.initial();

export const handlers = [
  rest.post(apiUrls.maze.create, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ maze_id: "mock-maze-id" }));
  }),
  rest.get(apiUrls.maze.getMazeState(":mazeId"), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(gameDetails));
  }),
  rest.post(apiUrls.maze.getMazeState(":mazeId"), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(gameState));
  }),
];
