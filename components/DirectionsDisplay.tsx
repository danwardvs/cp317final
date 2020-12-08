import * as React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

const DirectionsDisplay: React.FC<
  React.PropsWithChildren<{
    directions: any;
  }>
> = ({ directions }) => {
  return directions.map((step: any) => (
    <View style={[styles.button]}>
      <Text style={[styles.buttonText]}>{step.html_instructions}</Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#34ced1",
    height: 40,
    lineHeight: 52,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    margin: 6,

    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default DirectionsDisplay;
