import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import data from "../data/stops.json";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";
import { StackScreenProps } from "@react-navigation/stack";
import { BrowseParamList } from "../types/routeParams";
import { lookupStopId } from "../util/helpers";

function TabBarIcon(props: { name: string; color: string }) {
  return <AntDesign size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function BrowseStopScreen({
  navigation,
  route,
}: StackScreenProps<BrowseParamList, "BrowseStopScreen">) {
    const stop = lookupStopId(data.allStops, route.params.stop_id);
    if (stop)
        return (
            <View style={styles.container}>
            <FlatList
                data={stop.routes}
                renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() =>
                    navigation.navigate("StopDetailsScreen", { stop_id: stop.id, route: item.stop_route_id })
                    }
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
    flex: 1,
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
