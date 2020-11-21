import * as React from "react";
import { Button, Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import data from "../data/stops.json";
import { Stop } from "../types/Stop";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 43.4643,
          longitude: -80.5204,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {data.allStops.map((stop: Stop, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: stop.lat, longitude: stop.long }}
            title={stop.title}
            description={stop.description}
          />
        ))}
      </MapView>
      <Button onPress={() => console.log("bum")} title={"Find Location"} />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
});
