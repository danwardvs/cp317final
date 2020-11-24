import { Coordinate } from "../types/Types";

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

export const equalCoordinates = (
  coordinate_one: Coordinate,
  coordinate_two: Coordinate
) => {
  return (
    coordinate_one.latitude === coordinate_two.latitude &&
    coordinate_one.longitude === coordinate_two.longitude
  );
};
