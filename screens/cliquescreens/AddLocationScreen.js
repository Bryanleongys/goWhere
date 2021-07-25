// Navigates here after clicking member button on UpdateCliqueScreen
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
import { CommonActions } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import config from "../../config";

const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;
console.log(GOOGLE_PLACES_API_KEY);

const AddLocationScreen = ({ route, navigation }) => {
  const [buttonWord, setButtonWord] = React.useState(
    <Text style={{ fontFamily: "Avenir" }}>Add Location</Text>
  );
  const { friendName } = route.params;

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

  const handleSubmit = () => {
    if (location == "" || postalCode == "") {
      return Alert.alert("Please fill in missing fields");
    }
    setButtonWord(<ActivityIndicator size="small" color="#fff" />);

    let loc = {
      name: friendName,
      locationName: location,
      postalCode: postalCode,
      longitude: longitude,
      latitude: latitude,
      placeId: placeId,
    };
    console.log(loc);

    axios
      .patch(`${baseURL}cliques/addlocation/${GLOBAL.USER.cliqueID}`, loc)
      .then((res) => {
        if (res.status == 200) {
          console.log("Location added!");
          setLocation("");
          setPostalCode("");
          setPlaceId("");
          ref.current?.setAddressText("");
          setButtonWord(
            <Text style={{ fontFamily: "Avenir" }}>Add Location</Text>
          );
          return Alert.alert("Location added!");
        }
      })
      .catch((error) => {
        setButtonWord(
          <Text style={{ fontFamily: "Avenir" }}>Add Location</Text>
        );
        if (error.message == "Request failed with status code 404") {
          return Alert.alert("Location Name already exists!");
        }
        console.log(error);
      });
  };

  const handlePress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "CliqueScreen1" }],
      })
    );
  };

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{ color: "#148972" }} name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={{ fontSize: 17, fontFamily: "Avenir" }}>
            Add {friendName}'s Location
          </Title>
        </Body>
        <Right />
      </Header>
      <Content contentContainerStyle={{ paddingLeft: 10, paddingTop: 10 }}>
        <Item floatingLabel>
          <Label>Location Name</Label>
          <Input value={location} onChangeText={setLocation} />
        </Item>
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
            backgroundColor: "#148972",
          }}
        >
          {buttonWord}
        </Button>
        <Button
          block
          onPress={handlePress}
          style={{
            position: "absolute",
            top: 225,
            alignSelf: "center",
            width: "90%",
            backgroundColor: "#148972",
          }}
        >
          <Text style={{ fontFamily: "Avenir" }}>Done</Text>
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

export default AddLocationScreen;
