import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Platform,
} from "react-native";

const DirectionsDisplay: React.FC<
  React.PropsWithChildren<{
    directions: any;
  }>
> = ({ directions }) => {
  return directions.map((step: any, index: number) => {
    let text = "";
    if (Platform.OS === "android")
      text = step.html_instructions.replace(/<[^>]*>/g, "");
    else text = step.html_instructions.replaceAll(/<[^>]*>/g, "");

    return (
      <View style={[styles.button]} key={index}>
        <View style={{ display: "flex", flexDirection: "column", padding: 4 }}>
          <Text style={[styles.buttonText]}>
            {step.distance.text}: {text}
          </Text>
        </View>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffdc96",
    lineHeight: 52,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    margin: 2,

    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  buttonText: {
    fontSize: 16,
    color: "black",
  },
});

export default DirectionsDisplay;
