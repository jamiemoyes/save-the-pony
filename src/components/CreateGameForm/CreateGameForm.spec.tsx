import { CreateGameForm } from "./CreateGameForm";
import {
  cleanup,
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { describe, test, vi, expect, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "../../mocks/server";
import { apiUrls } from "../../shared/apiUrls";
import { rest } from "msw";

const mockOnCreate = vi.fn();

const getFormElements = () => ({
  ponyName: screen.getByRole("textbox", {
    name: "Pony name",
  }),
  boardWidth: screen.getByRole("spinbutton", {
    name: "Board width",
  }),
  boardHeight: screen.getByRole("spinbutton", {
    name: "Board height",
  }),
  difficulty: screen.getByRole("slider", {
    name: "Difficulty",
  }),
  submit: screen.getByRole("button", { name: "Create game" }),
});

describe("<CreateGameForm />", () => {
  function renderComponent() {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <CreateGameForm onCreate={mockOnCreate} />
      </QueryClientProvider>
    );
  }

  afterEach(() => {
    cleanup();
  });
  test("should display the create game form correctly", () => {
    renderComponent();
    const { boardHeight, boardWidth, difficulty, ponyName, submit } =
      getFormElements();
    [boardHeight, boardWidth, difficulty, ponyName, submit].forEach(
      (element) => {
        expect(element).toBeVisible();
      }
    );
  });

  test("should submit request correctly", async () => {
    renderComponent();
    const { boardHeight, boardWidth, difficulty, ponyName, submit } =
      getFormElements();

    userEvent.clear(boardWidth);
    userEvent.clear(boardHeight);

    await userEvent.type(ponyName, "Twilight Sparkle");
    await userEvent.type(boardWidth, "17");
    await userEvent.type(boardHeight, "24");
    fireEvent.change(difficulty, { target: { value: 6 } });
    userEvent.click(submit);
    await waitFor(() =>
      expect(mockOnCreate).toHaveBeenCalledWith("mock-maze-id")
    );
  });

  test("should handle server error correctly", async () => {
    server.use(
      rest.post(apiUrls.maze.create, (_, res, ctx) => {
        return res(ctx.status(403), ctx.text("Only ponies can play"));
      })
    );
    renderComponent();
    const { ponyName, submit } = getFormElements();
    await userEvent.type(ponyName, "Not a pony");

    userEvent.click(submit);
    await waitFor(() =>
      expect(screen.getByText("Only ponies can play")).toBeVisible()
    );
  });
});
