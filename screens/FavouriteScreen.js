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
import SwipeListElement from "./SwipeListElement";
import "./global.js";

const FavouriteScreen = ({ navigation }) => {
  GLOBAL = require("./global");
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
        {GLOBAL.FAVOURITEPLACES.map((place, index) => {
          return (
            <List>
              <ListItem>
                <Text>{place}</Text>
              </ListItem>
            </List>
          );
        })}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
