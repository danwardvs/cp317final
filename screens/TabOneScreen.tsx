import * as React from "react";
import { Button, Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import data from "../data/stops.json";
import { Stop } from "../types/Stop";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Coordinate } from "../types/Coordinate";

export default function TabOneScreen() {
  let mapRef = React.useRef<MapView>(null);
  const [userLocation, setUserLocation] = React.useState<Coordinate>();
  const [userGeocode, setUserGeocode] = React.useState<any>();
  const [details, setDetails] = React.useState<string>();

  const changeRegion = (latitude: number, longitude: number) => {
    mapRef?.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  const getGeocodeAsync = async (location: any) => {
    let geocode = await Location.reverseGeocodeAsync(location);
    setUserGeocode(geocode);
  };
  const getReadableAddress = (geocode: Location.LocationGeocodedAddress[]) => {
    let address = "";

    if (geocode[0]) {
      address =
        geocode[0].name +
        " " +
        geocode[0].street +
        " " +
        geocode[0].city +
        " " +
        geocode[0].region;
    }
    return address;
  };
  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("denied location");
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    const { latitude, longitude } = location.coords;
    setUserLocation({ latitude, longitude });
    changeRegion(latitude, longitude);

    getGeocodeAsync({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.mapStyle}
        initialRegion={{
          latitude: 43.4643,
          longitude: -80.5204,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title={"You"}
            description={"This is u"}
            pinColor={"red"}
            onPress={() => setDetails(getReadableAddress(userGeocode))}
          />
        )}
        {data.allStops.map((stop: Stop, index) => (
          <Marker
            key={index}
            coordinate={stop.location}
            title={stop.title}
            description={stop.description}
            pinColor={"blue"}
            onPress={() => setDetails(stop.schedule)}
          />
        ))}
      </MapView>
      <Button onPress={() => getLocationAsync()} title={"Find Location"} />
      <Text>Location details:</Text>
      {details && <Text>{details}</Text>}
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
