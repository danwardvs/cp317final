import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import MapScreen from "../screens/MapScreen";
import BrowseScreen from "../screens/BrowseScreen";
import { BottomTabParamList, MapParamList, BrowseParamList } from "../types";
import StopDetailsScreen from "../screens/StopDetailsScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Map"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              className="fontawesome"
              name="map-marker"
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Browse"
        component={BrowseNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon className="antdesign" name="bars" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { className: string; name: string; color: string }) {
  if (props.className === "fontawesome") {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
  }

  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MapStack = createStackNavigator<MapParamList>();

function MapNavigator() {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerTitle: "Map View" }}
      />
    </MapStack.Navigator>
  );
}

const BrowseStack = createStackNavigator<BrowseParamList>();

function BrowseNavigator() {
  return (
    <BrowseStack.Navigator>
      <BrowseStack.Screen
        name="BrowseScreen"
        component={BrowseScreen}
        options={{ headerTitle: "Browse By Stop" }}
      />
      <BrowseStack.Screen
        name="StopDetailsScreen"
        component={StopDetailsScreen}
        options={{ headerTitle: "Stop Details" }}
      />
    </BrowseStack.Navigator>
  );
}
