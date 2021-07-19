import React from "react";
import { StyleSheet, View } from "react-native";

const BoxContainer = (props) => {
  return (
    <View style={{ ...styles.boxContainer, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    height: 200,
    margin: 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BoxContainer;
