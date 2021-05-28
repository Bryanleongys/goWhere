// Navigates here when Update Travel Log button is clicked on HomeScreen
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
import { SwipeListView } from "react-native-swipe-list-view";
import SwipeListElement from "./SwipeListElement";

// Object containing key: date and value: array of locations pair
var travelHistory = {
  "26 May 2021": ["VivoCity", "Suntec City", "Somerset Shopping Centre"],
  "25 May 2021": ["Parkway Parade", "NEX Mall"],
  "24 May 2021": ["J-Cube", "Westgate Mall"],
  "23 May 2021": ["Bedok Mall", "Bedok Point"],
  "22 May 2021": ["Tampines Mall", "White Sands"],
};

var travelDates = Object.keys(travelHistory);
var travelLocations = Object.values(travelHistory); // array of arrays

class TravelLogScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "#bff6eb" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Travel Log</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.push("TravelScreen2")}
            >
              <Icon name="ios-add" />
            </Button>
          </Right>
        </Header>
        <Content>
          {travelDates.map((date, index) => {
            return (
              <Content>
                <Separator bordered style={{ height: 35 }}>
                  <Text>{date}</Text>
                </Separator>
                <List>
                  <SwipeListElement inputArray={travelLocations[index]} />
                </List>
              </Content>
            );
          })}
        </Content>
      </Container>
    );
  }
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

export default TravelLogScreen;
