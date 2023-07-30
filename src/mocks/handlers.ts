import { rest } from "msw";
import { apiUrls } from "../apiUrls";
import { gameMocks } from "./gameDetailsMock";

const { gameDetails, gameState } = gameMocks.moved();

export const handlers = [
  rest.post(apiUrls.maze.create, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ maze_id: "mock-maze-id" }));
  }),
  rest.get(apiUrls.maze.getMazeState(":mazeId"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(gameDetails));
  }),
  rest.post(apiUrls.maze.getMazeState(":mazeId"), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(gameState));
  }),
];
