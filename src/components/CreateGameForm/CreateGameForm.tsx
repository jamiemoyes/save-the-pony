import React, { useState } from "react";
import classNames from "./CreateGameForm.module.css";
import {
  CreateGameResponse,
  useCreatePonyGame,
} from "../../hooks/useCreatePonyGame";

interface CreateGameProps {
  onCreate: (mazeId: string) => void;
}

const CreateGameForm: React.FC<CreateGameProps> = ({ onCreate }) => {
  const [mazeWidth, setMazeWidth] = useState("15");
  const [mazeHeight, setMazeHeight] = useState("15");
  const [difficulty, setDifficulty] = useState("0");
  const [ponyName, setPonyName] = useState("");

  const { mutate: createPonyGame, error } = useCreatePonyGame({
    onSuccess: ({ maze_id }: CreateGameResponse) => onCreate(maze_id),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createPonyGame({
      mazeWidth: parseInt(mazeWidth),
      mazeHeight: parseInt(mazeHeight),
      difficulty: parseInt(difficulty),
      mazePlayerName: ponyName,
    });
  }

  return (
    <form className={classNames.createGameForm} onSubmit={handleSubmit}>
      <div className={classNames.inputContainer}>
        <label htmlFor="pony-name-input">Pony name</label>
        <input
          id="pony-name-input"
          onChange={(e) => setPonyName(e.target.value)}
          required
          aria-invalid={!!error}
          aria-errormessage="pony-name-input-error"
        />
        {!!error && error instanceof Error && (
          <p id="pony-name-input-error" className="validation-error">
            {error.message}
          </p>
        )}
      </div>
      <div className={classNames.inputContainer}>
        <label htmlFor="game-board-width-input">Board width</label>
        <input
          id="game-board-width-input"
          type="number"
          value={mazeWidth}
          min="15"
          max="25"
          onChange={(e) => setMazeWidth(e.target.value)}
        />
      </div>
      <div className={classNames.inputContainer}>
        <label htmlFor="game-board-height-input">Board height</label>
        <input
          id="game-board-height-input"
          type="number"
          value={mazeHeight}
          min="15"
          max="25"
          onChange={(e) => setMazeHeight(e.target.value)}
        />
      </div>
      <div className={classNames.inputContainer}>
        <label htmlFor="game-difficulty-slider">Difficulty</label>
        <input
          id="game-difficulty-slider"
          type="range"
          min="0"
          max="10"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
      </div>
      <button>Create game</button>
    </form>
  );
};

export { CreateGameForm };
