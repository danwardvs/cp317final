export interface Stop {
  location: Coordinate;
  title: string;
  description: string;
  schedule: string;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}
