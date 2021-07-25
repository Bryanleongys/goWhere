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
import "react-native-gesture-handler";
import getTransitTime from "../../algorithm/getTransitTime";
import getDrivingTime from "../../algorithm/getDrivingTime";

const TimeRouteScreen = ({ navigation, route }) => {
  const { objectArray, markerLat, markerLong, locationName, placeId, time } =
    route.params;
  const [currData, setData] = React.useState([]);
  const [transitArray, setTransitArray] = React.useState([]);
  const [drivingArray, setDrivingArray] = React.useState([]);

  var startLoc = ``;
  for (var i = 0; i < objectArray.length; i++) {
    startLoc = startLoc + `place_id:${objectArray[i].placeId}|`;
  }

  var endLoc = `place_id:${placeId}`;

  useEffect(() => {
    getTransitTime(startLoc, endLoc, time).then((data) => {
      setTransitArray(data);
    });
    getDrivingTime(startLoc, endLoc, time).then((data) => {
      setDrivingArray(data);
    });
  }, []);

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{ color: "#148972" }} name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ alignSelf: "center", flex: 3 }}>
          <Title style={styles.text}>To: {locationName}</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          <ListItem style={{ justifyContent: "center" }}>
            <Left></Left>
            <Right style={{ alignItems: "center" }}>
              <Icon name="ios-car-sport" />
            </Right>
            <Right />
            <Right style={{ alignItems: "center" }}>
              <Icon name="ios-bus" />
            </Right>
          </ListItem>
        </List>
        {transitArray.map((time, index) => {
          return (
            <List>
              <ListItem>
                <Left>
                  <Text style={styles.text}>
                    {objectArray[index].personName}
                  </Text>
                </Left>
                <Right style={{ alignItems: "center" }}>
                  <Text style={{ alignSelf: "center", fontFamily: "Avenir" }}>
                    {drivingArray[index]}
                  </Text>
                </Right>
                <Right />
                <Right
                  key={index}
                  style={{ alignItems: "center", fontFamily: "Avenir" }}
                >
                  <Text style={{ alignSelf: "center", fontFamily: "Avenir" }}>
                    {time}
                  </Text>
                </Right>
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
    fontFamily: "Avenir",
  },
});

export default TimeRouteScreen;
