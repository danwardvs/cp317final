import * as React from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { Text, View } from "../components/Themed";
import data from "../data/stops.json";
import { Stop, Coordinate, equalCoordinates } from "../types/Types";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import CustomButton from "../components/CustomButton";
import { unloadAllAsync } from "expo-font";

export default function TabOneScreen() {
  let mapRef = React.useRef<MapView>(null);
  const [loadingLocation, setLoadingLocation] = React.useState(false);
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
    setLoadingLocation(true);
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
    setLoadingLocation(false);
    getGeocodeAsync({ latitude, longitude });
  };
  const handleLocationPress = () => {
    setDetails(getReadableAddress(userGeocode));
  };
  const handleStopPress = (stop: Stop) => {
    setDetails(stop.schedule);
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
        showsCompass
        onPress={() => setDetails(undefined)}
        onMarkerPress={(marker) => {
          const coordinate: Coordinate = marker.nativeEvent.coordinate;
          if (userLocation && equalCoordinates(coordinate, userLocation)) {
            handleLocationPress();
          } else {
            const stop = data.allStops.find((stop) =>
              equalCoordinates(stop.location, coordinate)
            );
            if (stop) handleStopPress(stop);
          }
        }}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title={"You"}
            description={"This is u"}
            pinColor={"red"}
          />
        )}
        {data.allStops.map((stop: Stop, index) => (
          <Marker
            key={index}
            coordinate={stop.location}
            title={stop.title}
            description={stop.description}
            pinColor={"blue"}
          />
        ))}
      </MapView>
      <CustomButton
        onPress={() => getLocationAsync()}
        label={loadingLocation ? "" : "Find Location"}
      >
        {loadingLocation && <ActivityIndicator size="large" color="white" />}
      </CustomButton>
      {details && (
        <>
          <Text>Location details:</Text>
          <Text>{details}</Text>
        </>
      )}
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
