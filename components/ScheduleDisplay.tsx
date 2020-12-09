import * as WebBrowser from "expo-web-browser";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { StopRoute } from "../types/types";
import { getWeekday } from "../util/helpers";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

export default function ScheduleDisplay({ stop_route }: { stop_route: StopRoute }) {
  let weekly_schedule: string[] = ["Not Running.", "Not Running.", "Not Running."]
  for (let i = 0; i < 3; i++) {
    try {  
      weekly_schedule[i] = stop_route.schedule[i].arrival_time
    } catch (TypeError) {}
  }
  
  return (
    <View>
      {[0,1,2].map((index) => (
        <View style={styles.container} key={index}>
          <View style={{ width: "25%", height: 25 }}>
            <Text>{getWeekday(index)}</Text>
          </View>
          <View style={{ display: "flex", width: "75%" }}>
            <Text>{weekly_schedule[index]}</Text>
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
