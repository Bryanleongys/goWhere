import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  CheckBox,
  Text,
  Left,
  Right,
  Body,
  Footer,
  FooterTab,
} from "native-base";

const CheckboxElement = ({ name, color, parentCallback, index }) => {
  const [check, setCheck] = React.useState(false);

  function toggleSwitch() {
    setCheck(!check);
    onTrigger(!check, index);
  }

  const onTrigger = (data, index) => {
    parentCallback(data, index);
  };
  return (
    <ListItem button onPress={() => toggleSwitch()} style={styles.button}>
      <CheckBox
        color={color}
        checked={check}
        onPress={() => toggleSwitch()}
        style={styles.button}
      />
      <Body>
        <Text style={styles.text}>{name}</Text>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
  },
});

export default CheckboxElement;
