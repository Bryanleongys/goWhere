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

const UpdateCliqueScreen =({ navigation, route }) => {
    GLOBAL = require("../global");
    let [currData, setData] = React.useState([]);
    const [newData, setNewData] = React.useState([{}]);

    React.useEffect(() => {
      const unsubscribe = navigation.addListener("focus", () => {
        console.log("Refreshed");
        axios.get(`${baseURL}cliques/getfriends/60cba472c5923607e63bacd7`)
        .then((res) => {
          console.log("Get request success");
          //console.log(res.data);
          setData(res.data);
          //currData = [currData];
          //console.log(currData)
        })
        .catch((error) => {
          console.log("Get request failed")
        });
      });
      return unsubscribe;
    }, [navigation]);

    return (
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
          {/* <List>
            <SwipeMemberElement 
              inputArray={currData}
            />
          </List> */}
          {
          currData.map((friend) => {
            return(
              <Content>
                <List>
                  <SwipeMemberElement
                    inputArray={currData}
                    navi={navigation}
                  />
                </List>
              </Content>
            );
          })
        }
        </Content>
      </Container>
    );
}

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
