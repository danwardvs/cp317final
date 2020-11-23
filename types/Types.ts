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
export const equalCoordinates = (
  coordinate_one: Coordinate,
  coordinate_two: Coordinate
) => {
  return (
    coordinate_one.latitude === coordinate_two.latitude &&
    coordinate_one.longitude === coordinate_two.longitude
  );
};
