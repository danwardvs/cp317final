export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Map: undefined;
  Browse: undefined;
};

export type MapParamList = {
  MapScreen: undefined;
};

export type BrowseParamList = {
  BrowseScreen: undefined;
  BrowseStopScreen: { stop_id: number}
  StopDetailsScreen: { stop_id: number, route: number };
};
