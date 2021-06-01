import React, { Component } from "react";
import { StyleSheet } from "react-native";
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
  Separator,
  Item,
  List,
} from "native-base";
import SwipeDeleteElement from "./SwipeDeleteElement";

const FavouriteScreen = ({ navigation }) => {
  GLOBAL = require("./global");
  {
    console.log(GLOBAL.FAVOURITEPLACES);
  }
  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ alignSelf: "center" }}>
          <Title>Favourites</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <SwipeDeleteElement
          inputArray={Object.values(GLOBAL.FAVOURITEPLACES)}
        />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
  },
  button: {
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  question: {
    marginBottom: 15,
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 5,
  },
});

export default FavouriteScreen;
