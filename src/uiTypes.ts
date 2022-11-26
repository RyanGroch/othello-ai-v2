export enum PlayerType {
  "Human" = "Human",
  "Basic" = "Basic",
  "Dynamic" = "Dynamic",
  "Greedy" = "Greedy",
  "Random" = "Random",
}

export type Players = {
  evaluators: [PlayerType, PlayerType];
  depth: [number, number];
};
