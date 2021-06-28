/// Navigates here when Update Clique button is clicked on HomeScreen
import React, { Component, useEffect } from "react";
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
import SwipeMemberElement from "./SwipeMemberElement";
import "react-native-gesture-handler";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const UpdateCliqueScreen = ({ navigation, route }) => {
  GLOBAL = require("../global");
  const [currData, setCurrData] = React.useState([]);
  const [init, setInit] = React.useState(0);

  React.useEffect(() => {
    console.log("Refreshed");
    axios
      .get(`${baseURL}cliques/getfriends/${GLOBAL.USER.cliqueID}`)
      .then((res) => {
        console.log("Successfully GET request");
        setCurrData(res.data);
        setInit({ init: 1 });
      })
      .catch((error) => {
        console.log("GET request failed");
      });
  }, []);

  return init ? (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Members</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => navigation.navigate("CliqueScreen2")}
          >
            <Icon name="ios-add" />
          </Button>
        </Right>
      </Header>
      <Content>
        <SwipeMemberElement inputArray={currData} />
      </Content>
    </Container>
  ) : (
    <Text>Loading</Text>
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

export default UpdateCliqueScreen;
