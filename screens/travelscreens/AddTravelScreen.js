// Navigates here when plus button is pressed from Travel Log Screen
import React, { Component, useState } from "react";
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Text,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Title,
} from "native-base";
import { Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SwipeListView } from "react-native-swipe-list-view";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const AddTravelScreen = ({ navigation, route }) => {
  GLOBAL = require("../global");
  const [location, setLocation] = useState("");

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var dd = date.getDate();
  var mm = monthNames[date.getMonth()];
  var yyyy = date.getFullYear();

  var dateString = dd + " " + mm + " " + yyyy;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const alertPress = () => {
    if (dateString in GLOBAL.TRAVELHISTORY) {
      GLOBAL.TRAVELHISTORY[dateString].push(location);
    } else {
      GLOBAL.TRAVELHISTORY[dateString] = [location];
      console.log(location);
    }
    let locationDetails = {
      date: dateString,
      locationName: location,
      postalCode: "439947", // figure out how to get from google api
    };
    axios
      .patch(
        `${baseURL}cliques/addlog/60cba472c5923607e63bacd7`,
        locationDetails
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("Location successfully added!");
        }
      })
      .catch((error) => {
        if (error.message == "Request failed with status code 400") {
          return console.log("Error message");
        }
        console.log("Something went wrong");
      });
    navigation.navigate("Home");
  };

  const handlePress = () => {
    return Alert.alert("Location Added!", "", [
      {
        text: "OK",
        onPress: alertPress,
      },
    ]);
  };

  return (
    <Container>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Add Location</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content>
        <Item regular>
          <Text> Name of Location: </Text>
          <Input value={location} onChangeText={setLocation} />
        </Item>
        <Item>
          <Text> Date of Outing: </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChange}
            style={{ width: 130, alignSelf: "center", paddingTop: 50 }}
          />
        </Item>
        <Content style={{ paddingTop: 20 }}>
          <Button
            block
            style={{
              backgroundColor: "#bff6eb",
              width: 300,
              alignSelf: "center",
            }}
            onPress={handlePress}
          >
            <Text style={{ color: "#000000" }}>Update Travel Log</Text>
          </Button>
        </Content>
      </Content>
    </Container>
  );
};

export default AddTravelScreen;
