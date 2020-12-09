export interface Stop {
  id: number;
  title: string;
  routes: StopRoute[];
  location: Coordinate;
}

export interface StopRoute {
  stop_route_id: number;
  schedule: DayStopTimes[];
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface DayStopTimes {
  day: string;
  arrival_time: string;
}
