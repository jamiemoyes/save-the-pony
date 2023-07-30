import { Arrow } from "../../assets/icons";
import { Direction } from "../../shared/types";
import classNames from "./GamePad.module.css";
interface GamePadProps {
  onDirectionClick: (direction: Direction) => void;
}
const GamePad: React.FC<GamePadProps> = ({ onDirectionClick }) => {
  return (
    <div className={classNames.gamePadContainer}>
      <div className={classNames.gamePad}>
        <button
          id="left"
          aria-label="move-west"
          className={classNames.left}
          onClick={() => onDirectionClick(Direction.West)}
        >
          <Arrow />
        </button>
        <button
          id="up"
          aria-label="move-north"
          className={classNames.up}
          onClick={() => onDirectionClick(Direction.North)}
        >
          <Arrow />
        </button>
        <div className={classNames.center} />
        <button
          id="right"
          aria-label="move-east"
          className={classNames.right}
          onClick={() => onDirectionClick(Direction.East)}
        >
          <Arrow />
        </button>
        <button
          id="down"
          aria-label="move-south"
          className={classNames.down}
          onClick={() => onDirectionClick(Direction.South)}
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
};

export { GamePad };
