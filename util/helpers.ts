import { Coordinate, Stop } from "../types/types";

export const getWeekday = (day: number) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Invalid day";
  }
};
export const findDistance = (a: Coordinate, b: Coordinate) => {
  return (
    Math.abs(a.latitude - b.latitude) + Math.abs(a.longitude - a.longitude)
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
export const lookupStopId = (stops: Stop[], stop_id: string) => {
  return stops.find((stop) => stop.id === stop_id);
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
