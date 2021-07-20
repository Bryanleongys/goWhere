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
} from "native-base";
import { Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import config from "../../config";

const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;
console.log(GOOGLE_PLACES_API_KEY);

const EditMemberLocationScreen = ({ route, navigation }) => {
  GLOBAL = require("../global");
  const locationName = route.params.paramKey.locationName;
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [placeId, setPlaceId] = useState(null);

  const [buttonWord, setButtonWord] = React.useState(
    <Text>Edit Location</Text>
  );

  const ref = useRef();

  console.log(route.params.paramKey);
  const handleSubmit = () => {
    // if (location == "" || postalCode == "") {
    //     return Alert.alert("Please fill in missing fields");
    // }

    let inputDelete = {
      name: route.params.paramKey.name,
      locationName: route.params.paramKey.locationName,
    };

    console.log("Deleting");
    axios
      .patch(
        `${baseURL}cliques/removelocation/${GLOBAL.USER.cliqueID}`,
        inputDelete
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("Successful login!");
        }
        // else if (res.status == 400)
      })
      .catch((error) => {
        console.log("Failed");
      });

    let loc = {
      name: route.params.paramKey.name,
      locationName: route.params.paramKey.locationName,
      postalCode: postalCode,
      latitude: latitude,
      longitude: longitude,
      placeId: placeId
    };

    console.log("adding");
    axios
      .patch(`${baseURL}cliques/addlocation2/${GLOBAL.USER.cliqueID}`, loc)
      .then((res) => {
        if (res.status == 200) {
          console.log("Location added!");
          setLocation("");
          setPostalCode("");
          setLatitude(null);
          setLongitude(null);
          setPlaceId(null);
          setButtonWord(<Text>Add Location</Text>);
          return Alert.alert("Changes Successful!");
        }
      })
      .catch((error) => {
        setButtonWord(<Text>Add Location</Text>);
        Alert.alert("Failed to add");
        console.log(error);
      });

    navigation.goBack();
  };

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={{ fontSize: 17 }}>Edit Member Details</Title>
        </Body>
        <Right />
      </Header>
      <Content contentContainerStyle={{ paddingLeft: 10, paddingTop: 40 }}>
        {/* <Item floatingLabel>
          <Label>Location Name</Label>
          <Input value={location} onChangeText={setLocation} />
        </Item> */}
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              {" "}
              Selected Location: {locationName}
            </Text>
        <Item style={styles.searchBarContainer}>
          <GooglePlacesAutocomplete
            enablePoweredByContainer={false}
            fetchDetails={true}
            ref={ref}
            placeholder="Name/Postal"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
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
          {/* <Input value={location} onChangeText={setLocation} /> */}
        </Item>
        <Button
          block
          onPress={handleSubmit}
          style={{
            position: "absolute",
            top: 150,
            alignSelf: "center",
            width: "90%",
          }}
        >
          {buttonWord}
        </Button>
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
