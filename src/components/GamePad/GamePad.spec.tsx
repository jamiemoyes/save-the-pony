import { describe, test, vi, afterEach, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { Direction } from "../../shared/types";
import { cleanup, render, screen } from "@testing-library/react";
import { GamePad } from "./GamePad";

const mockOnDirectionClick = vi.fn();

describe("<GamePad>", () => {
  afterEach(() => {
    cleanup();
  });
  test.each([
    [Direction.West],
    [Direction.North],
    [Direction.East],
    [Direction.South],
  ])("triggers callback to move $i on click", async (direction) => {
    render(<GamePad onDirectionClick={mockOnDirectionClick} />);
    const triggerButton = screen.getByRole("button", {
      name: `move-${direction}`,
    });
    expect(triggerButton).toBeVisible();
    await userEvent.click(triggerButton);
    expect(mockOnDirectionClick).toHaveBeenCalledWith(direction);
  });
});
