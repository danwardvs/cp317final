import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import data from "../data/stops.json";
import ScheduleDisplay from "../components/ScheduleDisplay";
import Colors from "../constants/Colors";
import { StopRoute } from "../types/types";
import { getWeekday } from "../util/helpers";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import { lookupStopId, lookupRouteId } from "../util/helpers";
import { Stop } from "../types/types";
import CustomButton from "./CustomButton";

function TabBarIcon(props: { name: string; color: string }) {
  return <AntDesign size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function ScheduleRouteFromStopDisplay({ stop }: { stop: Stop }) {
  const [selectedSchedule, setSelectedSchedule] = React.useState<
    StopRoute | undefined
  >();

  if (selectedSchedule && typeof selectedSchedule !== "undefined") {
    return (
      <View style={{ padding: 12 }}>
        <CustomButton
          label={"Back"}
          onPress={() => setSelectedSchedule(undefined)}
        />
        <ScheduleDisplay stop_route={selectedSchedule} />
      </View>
    );
  }
  if (stop)
    return (
      <View style={styles.container}>
        <FlatList
          data={stop.routes}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                const route_to_display = lookupRouteId(
                  stop.routes,
                  item.stop_route_id
                );
                if (route_to_display) setSelectedSchedule(route_to_display);
              }}
            >
              <View style={styles.tile} key={item.stop_route_id}>
                <Text style={styles.item}>{item.stop_route_id}</Text>
                <View style={{ paddingTop: 10 }}>
                  <TabBarIcon name="right" color={"gray"} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Error loading stop data: Invalid ID</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tile: {
    borderColor: "gray",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
