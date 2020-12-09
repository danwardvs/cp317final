import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { StopRoute } from "../types/types";
import { getWeekday } from "../util/helpers";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function ScheduleDisplay({ stop_route }: { stop_route: StopRoute }) {
  return (
    <View>
      {stop_route.schedule.week.map((day, index) => (
        <View style={styles.container} key={index}>
          <View style={{ width: "25%", height: 25 }}>
            <Text>{getWeekday(index)}</Text>
          </View>
          <View style={{ display: "flex", width: "75%" }}>
            <Text>{stop_route.schedule.week[index]}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
