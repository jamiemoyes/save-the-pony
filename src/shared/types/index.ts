export enum Direction {
  East = "east",
  West = "west",
  North = "north",
  South = "south",
  Stay = "stay",
}

export enum State {
  Won = "won",
  Over = "over",
  Active = "active",
}

export interface GameState {
  state: State;
  "state-result": string;
  "hidden-url"?: string;
}

export enum Sex {
  Female = "Female",
  Male = "Male",
}

export interface Pony {
  id: number;
  name: string;
  alias?: string;
  url: string;
  sex: Sex;
  residence?: string;
  occupation?: string;
  kind: string[];
  image: string[];
}

export interface GameStateResponse {
  pony: [number];
  domokun: [number];
  "end-point": [number];
  size: [number, number];
  difficulty: number;
  data: ("north" | "west")[][];
  maze_id: string;
  "game-state": GameState;
}
