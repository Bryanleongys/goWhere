// Navigates here when plus button is pressed from Travel Log Screen
import React, { Component, useState, useRef, useEffect } from "react";
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
import { Alert, ActivityIndicator } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SwipeListView } from "react-native-swipe-list-view";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import config from "../../config";

const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;
console.log(GOOGLE_PLACES_API_KEY);

const AddTravelScreen = ({ navigation, route }) => {
  // for Google Maps API
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText("");
  }, []);

  GLOBAL = require("../global");
  const [location, setLocation] = useState("");
  const [buttonWord, setButtonWord] = useState(
    <Text style={{ color: "#000000" }}>Update Travel Log</Text>
  );

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
  var mmnumber = date.getMonth();
  var mm = monthNames[date.getMonth()];
  var yyyy = date.getFullYear();

  var dateNum = yyyy * 10000 + (mmnumber + 1) * 100 + dd;
  var dateString = dd + " " + mm + " " + yyyy;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handlePress = () => {
    // if (dateString in GLOBAL.TRAVELHISTORY) {
    //   GLOBAL.TRAVELHISTORY[dateString].push(location);
    // } else {
    //   GLOBAL.TRAVELHISTORY[dateString] = [location];
    //   console.log(location);
    // }
    if (location == "") {
      return Alert.alert("Please fill in missing fields!");
    }
    setButtonWord(<ActivityIndicator size="small" color="#000000" />);
    let locationDetails = {
      date: dateString,
      dateNum: dateNum,
      locationName: location,
      postalCode: "439947", // figure out how to get from google api
    };
    axios
      .patch(
        `${baseURL}cliques/addlog/${GLOBAL.USER.cliqueID}`,
        locationDetails
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("Location successfully added!");
          Alert.alert("Location Added!", "", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Home"),
            },
          ]);
        }
      })
      .catch((error) => {
        setButtonWord(
          <Text style={{ color: "#000000" }}>Update Travel Log</Text>
        );
        if (error.message == "Request failed with status code 404") {
          return Alert.alert("Location already exists!");
        }
        console.log("Something went wrong");
      });
  };

  return (
    <Container>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title>Add Location</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content>
        <Item regular style={{ width: 450 }}>
          <Text>Name of Location:</Text>
          <GooglePlacesAutocomplete
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            ref={ref}
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setLocation(details.structured_formatting.main_text);
              console.log(details);
            }}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: "en",
              components: "country:sg",
            }}
          />
          {/* <Input value={location} onChangeText={setLocation} /> */}
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
            {buttonWord}
          </Button>
        </Content>
      </Content>
    </Container>
  );
};

export default AddTravelScreen;
