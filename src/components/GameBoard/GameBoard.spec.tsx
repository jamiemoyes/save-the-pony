import { cleanup, render, screen } from "@testing-library/react";
import { describe, test, expect, afterEach } from "vitest";
import GameBoard from "./GameBoard";
import { gameMocks } from "../../mocks/gameDetailsMock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("<GameBoard />", () => {
  afterEach(() => {
    cleanup();
  });

  function renderComponent(mockGameDetails = gameMocks.initial().gameDetails) {
    const queryClient = new QueryClient({
      defaultOptions: { mutations: { retry: false }, queries: {} },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <GameBoard gameDetails={mockGameDetails} />
      </QueryClientProvider>
    );
  }

  test("should display items at correct co-ordinates", () => {
    const { gameDetails } = gameMocks.initial();
    renderComponent(gameDetails);
    expect(
      screen.getByRole("img", {
        name: `The pony is at location ${gameDetails.pony[0]}`,
      })
    );
    expect(
      screen.getByRole("img", {
        name: `The domokun is at location ${gameDetails.domokun[0]}`,
      })
    );
    expect(
      screen.getByRole("img", {
        name: `The end point is at location ${gameDetails["end-point"][0]}`,
      })
    );
  });
});
