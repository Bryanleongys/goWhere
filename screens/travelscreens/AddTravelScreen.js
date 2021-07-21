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
import { Alert, ActivityIndicator, StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SwipeListView } from "react-native-swipe-list-view";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import config from "../../config";

const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

const AddTravelScreen = ({ navigation, route }) => {
  // for Google Maps API
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText("");
  }, []);

  GLOBAL = require("../global");
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  console.log(postalCode);

  const [buttonWord, setButtonWord] = useState(
    <Text style={{ color: "#000000", fontFamily: "Avenir" }}>
      Update Travel Log
    </Text>
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
      postalCode: postalCode,
      longitude: longitude,
      latitude: latitude,
      placeId: placeId,
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
              onPress: () => navigation.goBack(),
            },
          ]);
        }
      })
      .catch((error) => {
        setButtonWord(
          <Text style={{ color: "#000000", fontFamily: "Avenir" }}>
            Update Travel Log
          </Text>
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
            <Icon style={{ color: "#148972" }} name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={{ fontFamily: "Avenir" }}>Add Location</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content>
        <Item
          regular
          style={{
            position: "absolute",
            height: 30,
            width: "100%",
          }}
        >
          <Text style={{ fontFamily: "Avenir" }}>Name of Location</Text>
        </Item>
        <Item style={styles.searchBarContainer}>
          <GooglePlacesAutocomplete
            enablePoweredByContainer={false}
            fetchDetails={true}
            ref={ref}
            placeholder="Name/Postal"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setLocation(data.structured_formatting.main_text);
              setLongitude(details.geometry.location.lng);
              setLatitude(details.geometry.location.lat);
              const postalNum = details?.address_components.find(
                (addressComponent) =>
                  addressComponent.types.includes("postal_code")
              )?.short_name;
              setPostalCode(postalNum);
              setPlaceId(details.place_id);
            }}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: "en",
              components: "country:sg",
            }}
            styles={autoCompleteStyles}
          />
        </Item>
        <Item
          style={{ position: "absolute", top: 85, height: 55, width: "100%" }}
        >
          <Text style={{ fontFamily: "Avenir" }}> Date of Outing </Text>
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
        <Content
          style={{
            paddingTop: 20,
            position: "absolute",
            top: 150,
            alignSelf: "center",
          }}
        >
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

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 30,
    zIndex: 1,
  },
});

const autoCompleteStyles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
  },
  listView: {
    borderColor: "#c8c7cc",
    borderWidth: 1,
    borderRadius: 2,
  },
});

export default AddTravelScreen;
