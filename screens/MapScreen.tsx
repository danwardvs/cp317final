import * as React from "react";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { Text, View } from "../components/Themed";
import data from "../data/stops.json";
import { Stop, Coordinate, Schedule } from "../types/types";
import {
  equalCoordinates,
  getWeekday,
  findDistance,
  stopToString,
  coordinateToString,
} from "../util/helpers";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import CustomButton from "../components/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import ScheduleDisplay from "../components/ScheduleDisplay";
import appData from "../app.json";
import MapViewDirections from "react-native-maps-directions";
import DirectionsDisplay from "../components/DirectionsDisplay";

export default function MapScreen() {
  let mapRef = React.useRef<MapView>(null);
  const [loadingLocation, setLoadingLocation] = React.useState(false);
  const [loadingDirections, setLoadingDirections] = React.useState(false);

  const [userLocation, setUserLocation] = React.useState<Coordinate>();
  const [userGeocode, setUserGeocode] = React.useState<any>();
  const [details, setDetails] = React.useState<string>();
  const [selectedStop, setSelectedStop] = React.useState<Stop>();
  const [displayDirections, setDisplayDirections] = React.useState<boolean>();
  const [directions, setDirections] = React.useState<any>();
  const [travelMethod, setTravelMethod] = React.useState("walking");

  const changeRegion = (
    latitude: number,
    longitude: number,
    delta?: number
  ) => {
    mapRef?.current?.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: delta ?? 0.01,
        longitudeDelta: delta ?? 0.01,
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
  const findNearestStop = (userLocation: Coordinate) => {
    let closestStop = data.allStops[0];
    data.allStops.forEach((stop) => {
      if (
        findDistance(closestStop.location, userLocation) >
        findDistance(stop.location, userLocation)
      )
        closestStop = stop;
    });
    return closestStop;
  };

  const getLocationAsync = async () => {
    setLoadingLocation(true);
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("denied location");
    } else {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
      changeRegion(latitude, longitude);
      setLoadingLocation(false);
      getGeocodeAsync({ latitude, longitude });
    }
  };
  const handleLocationPress = () => {
    if (userGeocode) {
      setDetails("Current Location:\n" + getReadableAddress(userGeocode));
    } else {
      setDetails("Current address unavailable.");
    }
    setSelectedStop(undefined);
  };
  const handleStopPress = (stop: Stop) => {
    setDetails(undefined);
    setSelectedStop(stop);
  };
  const handleDirection = () => {};
  return (
    <ScrollView>
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
          onPress={() => {
            setDetails(undefined);
            setSelectedStop(undefined);
            setDisplayDirections(false);
          }}
          onMarkerPress={(marker) => {
            setDisplayDirections(false);
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
          {userLocation && selectedStop && displayDirections && (
            <MapViewDirections
              origin={userLocation}
              destination={selectedStop.location}
              apikey={appData.expo.android.config.googleMaps.apiKey}
              strokeWidth={4}
              strokeColor="green"
            />
          )}
        </MapView>
        <CustomButton
          onPress={() => getLocationAsync()}
          label={loadingLocation ? "" : "Find Location"}
        >
          {loadingLocation && <ActivityIndicator size="small" color="white" />}
        </CustomButton>
        {userLocation && !selectedStop && (
          <CustomButton
            onPress={() => {
              const closestStop = findNearestStop(userLocation);
              changeRegion(
                closestStop.location.latitude,
                closestStop.location.longitude,
                0.005
              );
              setDetails(
                "Closest stop is:\n" +
                  closestStop.title +
                  "\n" +
                  closestStop.description
              );
            }}
            label={"Find Nearest Stop"}
          ></CustomButton>
        )}
        {userLocation && selectedStop && (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <CustomButton
              onPress={() => {
                setLoadingDirections(true);
                setDisplayDirections(true);
                fetch(
                  "https://maps.googleapis.com/maps/api/directions/json?origin=" +
                    coordinateToString(userLocation) +
                    "&destination=" +
                    stopToString(selectedStop) +
                    "&key=" +
                    appData.expo.android.config.googleMaps.apiKey +
                    "&mode=" +
                    travelMethod
                )
                  .then((response) => response.json())
                  .then((json) => {
                    setLoadingDirections(false);
                    const data = json.routes[0].legs[0].steps;
                    setDirections(data);
                  });
              }}
              label={loadingDirections ? "" : "Get Directions"}
            >
              {loadingDirections && (
                <ActivityIndicator size="small" color="white" />
              )}
            </CustomButton>
            <CustomButton
              color={travelMethod !== "walking" ? "green" : "gray"}
              label="Walk"
              onPress={() => setTravelMethod("driving")}
            />
            <CustomButton
              color={travelMethod === "walking" ? "green" : "gray"}
              label="Drive"
              onPress={() => setTravelMethod("walking")}
            />
          </View>
        )}

        {details && (
          <>
            <Text style={styles.details}>{details}</Text>
          </>
        )}
        {!details && selectedStop && (
          <View style={{ padding: 12 }}>
            <ScheduleDisplay stop={selectedStop} />
          </View>
        )}
        {!details && displayDirections && directions && (
          <DirectionsDisplay directions={directions} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Dimensions.get("window").height - 130,
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
  details: {
    padding: 16,
    fontSize: 20,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2.5,
  },
});
