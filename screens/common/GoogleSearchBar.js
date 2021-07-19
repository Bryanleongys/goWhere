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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import BoxContainer from "../travelscreens/BoxContainer";

import config from "../../config";

const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

const GoogleSearchBar = ({ parentCallback, index }) => {
  const [locationName, setLocationName] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);
  const [placeId, setPlaceId] = React.useState(null);

  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText("");
  }, []);

  var objectPass = {
    personName: "Person " + (index + 1),
    locationName: locationName,
    postalCode: postalCode,
    latitude: latitude,
    longitude: longitude,
    placeId: placeId,
  };

  const onTrigger = () => {
    parentCallback(objectPass, index);
  };

  return (
    <Content contentContainerStyle={{ paddingBottom: 30 }}>
      <BoxContainer style={styles.container}>
        <Text> Person {index + 1}</Text>
        <GooglePlacesAutocomplete
          enablePoweredByContainer={false}
          fetchDetails={true}
          ref={ref}
          placeholder="Name/Postal"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setLatitude(details.geometry.location.lat);
            setLongitude(details.geometry.location.lng);
            setLocationName(data.structured_formatting.main_text);
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
        {onTrigger()}
      </BoxContainer>
    </Content>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    width: "90%",
  },
  container: {
    backgroundColor: "#8AEEDA",
    height: 210,
    width: 350,
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
    height: 90,
  },
});

export default GoogleSearchBar;
