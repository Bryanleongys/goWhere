// Navigates here after clicking Choose Location button on JomeScreen
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
import { useNavigation } from "@react-navigation/native";

const SelectPersonScreen = () => {
  const arrayFriends = ["Bryan", "Mukund", "Sheryl"];
  const [arrayCheck, setArrayCheck] = React.useState([]);

  for (var i = 0; i < arrayFriends.length(); i++) {
    setArrayCheck();
  }
};
