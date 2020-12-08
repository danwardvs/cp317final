import * as React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const DirectionsDisplay: React.FC<
  React.PropsWithChildren<{
    directions: any;
  }>
> = ({ directions }) => {
  return directions.map((step: any, index: number) => {
    const text = step.html_instructions.replaceAll(/<[^>]*>/g, "");
    return (
      <View style={[styles.button]} key={index}>
        <Text style={[styles.buttonText]}>
          {step.distance.text}: {text}
        </Text>
      </View>
    );
  });
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffdc96",
    height: 40,
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
