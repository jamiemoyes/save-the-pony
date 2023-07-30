import { describe, expect, test, vi, afterEach } from "vitest";
import { gameMocks, server } from "../../mocks";
import { rest } from "msw";
import { apiUrls } from "../../shared/apiUrls";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Game } from "./Game";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GameStateResponse } from "../../shared/types";

const mockRestartGame = vi.fn();

async function assertGameCharacters(gameDetails: GameStateResponse) {
  expect(
    await screen.findByRole("img", {
      name: `The pony is at location ${gameDetails.pony[0]}`,
    })
  ).toBeVisible();

  expect(
    screen.getByRole("img", {
      name: `The domokun is at location ${gameDetails.domokun[0]}`,
    })
  ).toBeVisible();
  expect(
    screen.getByRole("img", {
      name: `The end point is at location ${gameDetails["end-point"][0]}`,
    })
  ).toBeVisible();
}

describe("<Game />", () => {
  afterEach(() => {
    cleanup();
  });
  function renderComponent() {
    const queryClient = new QueryClient({
      defaultOptions: { mutations: { retry: false }, queries: {} },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <Game mazeId="mock-match-id" restartGame={mockRestartGame} />
      </QueryClientProvider>
    );
  }
  test("should show game over screen when the game has been lost", async () => {
    const { gameState } = gameMocks.over();
    server.use(
      rest.post(apiUrls.maze.getMazeState(":mazeId"), (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(gameState));
      })
    );
    renderComponent();

    await userEvent.click(
      await screen.findByRole("button", { name: "move-south" })
    );

    expect(await screen.findByText("Game over")).toBeVisible();
    expect(screen.getByText("You lost. Killed by monster")).toBeVisible();
  });

  test("should show game won screen when the game has been won", async () => {
    const { gameState } = gameMocks.won();
    server.use(
      rest.post(apiUrls.maze.getMazeState(":mazeId"), (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(gameState));
      })
    );
    renderComponent();
    await userEvent.click(
      await screen.findByRole("button", { name: "move-south" })
    );

    expect(await screen.findByText("You won!")).toBeVisible();
    expect(screen.getByText("You won. Game ended")).toBeVisible();
  });

  test("should trigger call to send direction when keypad is clicked", async () => {
    const { gameDetails: initialGameDetails } = gameMocks.initial();
    const { gameDetails: movedGameDetails } = gameMocks.moved();

    renderComponent();

    await assertGameCharacters(initialGameDetails);

    server.use(
      rest.get(apiUrls.maze.getMazeState(":mazeId"), (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(movedGameDetails));
      })
    );

    await userEvent.click(screen.getByRole("button", { name: "move-south" }));
    await assertGameCharacters(movedGameDetails);
  });
});
