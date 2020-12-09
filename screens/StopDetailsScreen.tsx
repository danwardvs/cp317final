import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScheduleDisplay from "../components/ScheduleDisplay";
import data from "../data/stops.json";

import { BrowseParamList } from "../types/routeParams";
import { lookupStopId, lookupRouteId } from "../util/helpers";

export default function StopDetailsScreen({
  navigation,
  route,
}: StackScreenProps<BrowseParamList, "StopDetailsScreen">) {
  const stop = lookupStopId(data.allStops, route.params.stop_id);
  if (stop) {
    const stop_route = lookupRouteId(stop.routes, route.params.route);
    if (stop_route)
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{stop.title}</Text>
          <Text style={styles.details}>{stop_route.stop_route_id}</Text>

          <ScheduleDisplay stop_route={stop_route} />
        </View>
      );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error loading stop data: Invalid ID</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  details: {
    fontSize: 18,
    paddingBottom: 24,
  },
});
