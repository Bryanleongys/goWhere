// Navigates here when Update Travel Log button is clicked on HomeScreen
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
import SwipeListElement from "./SwipeBorderElement";
import "react-native-gesture-handler";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

// Object containing key: date and value: array of locations pair
// var travelHistory = {
//   "26 May 2021": ["VivoCity", "Suntec City", "Somerset Shopping Centre"],
//   "25 May 2021": ["Parkway Parade", "NEX Mall"],
//   "24 May 2021": ["J-Cube", "Westgate Mall"],
//   "23 May 2021": ["Bedok Mall", "Bedok Point"],
//   "22 May 2021": ["Tampines Mall", "White Sands"],
// };

// var travelDates = Object.keys(travelHistory);
// var travelLocations = Object.values(travelHistory); // array of arrays
// React.useEffect(() => {
//   if (route.params?.location && route.params?.date) {
//     if (route.params?.date in travelHistory) {
//       travelHistory[route.params?.date].push(route.params?.location);
//     } else {
//       travelHistory[route.params?.date] = [route.params?.location];
//       console.log("Bleh");
//     }
//   }
// });
const TravelLogScreen = ({ navigation, route }) => {
  GLOBAL = require("../global");
  const [currData, setData] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Refreshed");
      axios
        .get(`${baseURL}cliques/getlogs/60cba472c5923607e63bacd7`)
        .then((res) => {
          console.log("Successfully GET request");
          setData(res.data);
        })
        .catch((error) => {
          console.log("GET request failed");
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
          <Title>Travel Log</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => navigation.push("Favourite")}>
            <Icon style={{ fontSize: 22 }} name="ios-star" />
          </Button>
          <Button transparent onPress={() => navigation.push("TravelScreen2")}>
            <Icon name="ios-add" />
          </Button>
        </Right>
      </Header>
      <Content>
        {/* {console.log(currData)} */}
        {currData.map((log) => {
          return (
            <Content>
              <List>
                <SwipeListElement
                  inputArray={log.locations}
                  date={log.date}
                  key="{log}"
                />
              </List>
            </Content>
          );
        })}
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

export default TravelLogScreen;
