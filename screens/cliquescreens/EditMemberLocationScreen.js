import React, { Component, useState, useRef, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text,
  List,
  ListItem,
} from "native-base";
import { Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import config from "../../config";

const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

const EditMemberLocationScreen = ({ route, navigation }) => {
  GLOBAL = require("../global");
  var { locationName, name, postalCode, placeId } = route.params.paramKey;
  const [locationPlace, setLocationPlace] = React.useState();

  async function getPlaceDetails() {
    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=formatted_address&key=${GOOGLE_PLACES_API_KEY}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setLocationPlace(responseJson.result.formatted_address);
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  getPlaceDetails();

  if (postalCode == undefined) {
    postalCode = "Cannot be found";
  }

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={{ fontSize: 17 }}> {name}'s Location</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{ backgroundColor: "#fff" }}>
        {/* <Item floatingLabel>
          <Label>Location Name</Label>
          <Input value={location} onChangeText={setLocation} />
        </Item> */}
        <List>
          <ListItem style={{ height: 45 }}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              {" "}
              Location Name:
            </Text>
          </ListItem>
          <ListItem style={{ height: 45 }}>
            <Text style={{ textAlign: "center" }}> {locationName}</Text>
          </ListItem>
          <ListItem style={{ height: 45 }}>
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              {" "}
              Location Address:{" "}
            </Text>
          </ListItem>
          <ListItem style={{ height: 45 }}>
            <Text style={{ textAlign: "center" }}> {locationPlace}</Text>
          </ListItem>
        </List>

        {/* <Input value={location} onChangeText={setLocation} /> */}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
  },
  searchBarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 75,
    zIndex: 1,
    width: "100%",
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
  row: {
    backgroundColor: "#bff6eb",
  },
  textInput: {
    backgroundColor: "#bff6eb",
  },
});

export default EditMemberLocationScreen;
