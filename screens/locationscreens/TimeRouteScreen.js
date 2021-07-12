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
import getDistanceMatrix from "../../algorithm/getDistanceMatrix";

const TimeRouteScreen = ({ navigation, route }) => {
  const { objectArray, markerLat, markerLong, locationName } = route.params;
  const [currData, setData] = React.useState([]);
  const [timeArray, setTimeArray] = React.useState([]);

  var startLoc = ``;
  for (var i = 0; i < objectArray.length; i++) {
    startLoc =
      startLoc + `${objectArray[i].latitude},${objectArray[i].longitude}|`;
  }

  var endLoc = `${markerLat},${markerLong}`;

  useEffect(() => {
    getDistanceMatrix(startLoc, endLoc).then((data) => {
      setTimeArray(data);
    });
    // var endLoc = ``;
    // for (var i = 0; i < nearbyArray.length; i++) {
    //   endLoc = endLoc + `place_id:${nearbyArray[i].place_id}|`;
    // }
    // getDistanceMatrix(startLoc, endLoc).then((data) => {
    //   setTimeArray(data);
    // });
  }, []);

  console.log(timeArray);

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ alignSelf: "center", flex: 3 }}>
          <Title>Travel Time</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          <ListItem style={{ justifyContent: "center" }}>
            <Text>To {locationName}:</Text>
          </ListItem>
        </List>
        {timeArray.map((time, index) => {
          return (
            <List>
              <ListItem>
                <Left>
                  <Text>{objectArray[index].personName}</Text>
                </Left>
                <Right>
                  <Text>{time}</Text>
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
    marginBottom: 5,
  },
});

export default TimeRouteScreen;
