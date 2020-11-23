import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import data from "../data/stops.json";

import { Text, View } from "../components/Themed";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: "Devin" },
          { key: "Dan" },
          { key: "Dominic" },
          { key: "Jackson" },
          { key: "James" },
          { key: "Joel" },
          { key: "John" },
          { key: "Jillian" },
          { key: "Jimmy" },
          { key: "Julie" },
          { key: "Devin" },
          { key: "Dan" },
          { key: "Dominic" },
          { key: "Jackson" },
          { key: "James" },
          { key: "Joel" },
          { key: "John" },
          { key: "Jillian" },
          { key: "Jimmy" },
          { key: "Julie" },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
