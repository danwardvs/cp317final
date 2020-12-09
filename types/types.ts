export interface Stop {
  id: number;
  title: string;
  routes: StopRoute[];
  location: Coordinate;
}

export interface StopRoute {
  stop_route_id: number;
  schedule: Schedule;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Schedule {
  week: string[];
}
