// Location Element for InputLocationScreen
import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Icon,
  Picker,
  Form,
  Button,
  Left,
  Right,
  Body,
  Title,
  Item,
  Text,
  Input,
  Label,
  View,
} from "native-base";

const LocationElement = ({ index }) => {
  return (
    <View style={{ paddingBottom: 20 }}>
      <Item style={{ alignSelf: "center", paddingBottom: 10 }}>
        <Text> Person {index}: </Text>
        <Item regular style={{ width: 300 }}>
          <Input placeholder="Postal Code" />
        </Item>
      </Item>
    </View>
  );
};

export default LocationElement;
