import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import data from "../data/stops.json";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import { StackScreenProps } from "@react-navigation/stack";
import { BrowseParamList } from "../types/routeParams";

function TabBarIcon(props: { name: string; color: string }) {
  return <AntDesign size={24} style={{ marginBottom: -3 }} {...props} />;
}

// Name of the module: BrowseScreen
// Date of module creation: November 24, 2020
// Author of the module: Danny Van Stemp
// Modification history:
//    Modification Date: Decemeber 8, 2020
//    Modification Author: Hayden Jeanson
//    Modification Details: Updated to pass data to the new BrowseStopScreen
// Synopsis of the module about what the module does: Screen for showing all of the stops

export default function BrowseScreen({
  navigation,
}: StackScreenProps<BrowseParamList, "BrowseScreen">) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data.allStops}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BrowseStopScreen", { stop_id: item.id })
            }
          >
            <View style={styles.tile} key={item.title}>
              <Text style={styles.item}>{item.title}</Text>
              <View style={{ paddingTop: 10 }}>
                <TabBarIcon name="right" color={"gray"} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
