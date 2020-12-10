import { Coordinate, Stop, StopRoute } from "../types/types";

// Name of the module: getWeekday
// Date of module creation: November 24, 2020
// Author of the module: Danny Van Stemp
// Modification history:
//    Modification Date: Decemeber 8, 2020
//    Modification Author: Hayden Jeanson
//    Modification Details: Updated to return Monday-Friday as one element rather than 5
// Synopsis of the module about what the module does: Returns weekday based on index

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

// Name of the module: findDistance
// Date of module creation: November 24, 2020
// Author of the module: Danny Van Stemp
// Modification history: None
// Synopsis of the module about what the module does: Returns distance between two coordinates {langitude, longitude}

export const findDistance = (a: Coordinate, b: Coordinate) => {
  return Math.sqrt(
    Math.pow(a.latitude - b.latitude, 2) +
      Math.pow(a.longitude - b.longitude, 2)
  );
};

// Name of the module: coordinateToString
// Date of module creation: November 24, 2020
// Author of the module: Danny Van Stemp
// Modification history: None
// Synopsis of the module about what the module does: Converts a coordinate {langitude, longitude} into a string

export const coordinateToString = (coordinate: Coordinate) => {
  return coordinate.latitude.toString() + "," + coordinate.longitude.toString();
};

// Name of the module: stopToString
// Date of module creation: November 24, 2020
// Author of the module: Danny Van Stemp
// Modification history: None
// Synopsis of the module about what the module does: Converts a stop into a string

export const stopToString = (stop: Stop) => {
  return (
    stop.location.latitude.toString() + "," + stop.location.longitude.toString()
  );
};

// Name of the module: lookupStopId
// Date of module creation: November 24, 2020
// Author of the module: Danny Van Stemp
// Modification history:
//    Modification Date: Decemeber 8, 2020
//    Modification Author: Hayden Jeanson
//    Modification Details: Updated to use new JSON format
// Synopsis of the module about what the module does: Returns the id of a stop from the JSON


export const lookupStopId = (stops: Stop[], stop_id: number) => {
  return stops.find((stop) => stop.id === stop_id);
};

// Name of the module: lookupRouteId
// Date of module creation: December 8, 2020
// Author of the module: Hayden Jeanson
// Modification history: None
// Synopsis of the module about what the module does: Returns the id of a route at a stop from the JSON

export const lookupRouteId = (routes: StopRoute[], stop_route_id: number) => {
  return routes.find((stop_route) => stop_route.stop_route_id === stop_route_id);
};

// Name of the module: stopToString
// Date of module creation: November 24, 2020
// Author of the module: Danny Van Stemp
// Modification history: None
// Synopsis of the module about what the module does: returns a boolean indicating the equivalancy of two coordinates {langitude, longitude}

export const equalCoordinates = (
  coordinate_one: Coordinate,
  coordinate_two: Coordinate
) => {
  return (
    coordinate_one.latitude === coordinate_two.latitude &&
    coordinate_one.longitude === coordinate_two.longitude
  );
};
