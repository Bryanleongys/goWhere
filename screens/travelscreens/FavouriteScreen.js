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
import SwipeDeleteElement from "./SwipeElement";
import "react-native-gesture-handler";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import LoadingScreen from "../common/LoadingScreen";

const FavouriteScreen = ({ navigation }) => {
  GLOBAL = require("../global");

  const [currData, setData] = React.useState([]);
  const [init, setInit] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Refreshed");
      axios
        .get(`${baseURL}cliques/getfavourites/${GLOBAL.USER.cliqueID}`)
        .then((res) => {
          console.log("Successfully GET request");
          setData(res.data);
          setInit({ init: 1 });
        })
        .catch((error) => {
          console.log("GET request failed");
        });
    });
    return unsubscribe;
  }, [navigation]);

  return init ? (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{ color: "#148972" }} name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ alignSelf: "center", flex: 3 }}>
          <Title>Favourites</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <SwipeDeleteElement inputArray={currData} />
      </Content>
    </Container>
  ) : (
    <LoadingScreen />
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
