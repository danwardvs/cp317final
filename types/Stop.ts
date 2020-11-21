import { Coordinate } from "./Coordinate";

export interface Stop {
  location: Coordinate;
  title: string;
  description: string;
  schedule: string;
}
