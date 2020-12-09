import { Coordinate, Stop, StopRoute } from "../types/types";

export const getWeekday = (day: number) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday-Friday";
    case 2:
      return "Saturday";
    default:
      return "Invalid day";
  }
};
export const findDistance = (a: Coordinate, b: Coordinate) => {
  return Math.sqrt(
    Math.pow(a.latitude - b.latitude, 2) +
      Math.pow(a.longitude - b.longitude, 2)
  );
};
export const coordinateToString = (coordinate: Coordinate) => {
  return coordinate.latitude.toString() + "," + coordinate.longitude.toString();
};
export const stopToString = (stop: Stop) => {
  return (
    stop.location.latitude.toString() + "," + stop.location.longitude.toString()
  );
};
export const lookupStopId = (stops: Stop[], stop_id: number) => {
  return stops.find((stop) => stop.id === stop_id);
};

export const lookupRouteId = (routes: StopRoute[], stop_route_id: number) => {
  return routes.find((stop_route) => stop_route.stop_route_id === stop_route_id);
};

export const equalCoordinates = (
  coordinate_one: Coordinate,
  coordinate_two: Coordinate
) => {
  return (
    coordinate_one.latitude === coordinate_two.latitude &&
    coordinate_one.longitude === coordinate_two.longitude
  );
};
