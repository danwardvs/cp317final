import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import data from "../data/stops.json";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import { StackScreenProps } from "@react-navigation/stack";
import { BrowseParamList } from "../types";

function TabBarIcon(props: { name: string; color: string }) {
  return <AntDesign size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function BrowseScreen({
  navigation,
}: StackScreenProps<BrowseParamList, "BrowseScreen">) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data.allStops}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("StopDetailsScreen")}
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
