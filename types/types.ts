export interface Stop {
  location: Coordinate;
  title: string;
  id: string;
  description: string;
  schedule: Schedule;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Schedule {
  week: string[];
}
