import * as React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

// Name of the module: CustomButton
// Date of module creation: November 24, 2020
// Author of the module: Danny Van Stemp
// Modification history: none
// Synopsis of the module about what the module does: Renders a custom styled button based on passed parameters.
// Passed in colour, onPress routines, labels, and children defines how the button will look and function

const CustomButton: React.FC<
  React.PropsWithChildren<{
    color?: string;
    onPress?: () => void;
    style?: any;
    label?: string;
  }>
> = ({ color, onPress, children, label, style = {} }) => {
  const handleClick = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      onPress={handleClick}
      style={[styles.button, style, color ? { backgroundColor: color } : {}]}
    >
      <Text style={[styles.buttonText]}>
        {children}
        {label}
      </Text>
    </TouchableOpacity>
  );
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

export default CustomButton;
