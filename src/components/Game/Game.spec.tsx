import { describe, expect, test, vi } from "vitest";
import { gameMocks, server } from "../../mocks";
import { rest } from "msw";
import { apiUrls } from "../../apiUrls";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Game } from "./Game";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockRestartGame = vi.fn();

describe("<Game />", () => {
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
      rest.post(apiUrls.maze.getMazeState(":mazeId"), (req, res, ctx) => {
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
      rest.post(apiUrls.maze.getMazeState(":mazeId"), (req, res, ctx) => {
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
});
