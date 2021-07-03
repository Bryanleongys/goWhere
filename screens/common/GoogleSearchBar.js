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

import config from "../../config";

const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

const GoogleSearchBar = () => {
  const [location, setLocation] = useState("");

  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText("");
  }, []);

  return (
    <Item style={styles.searchBarContainer}>
      <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        ref={ref}
        placeholder="Name/Postal"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          // setLocation(data.structured_formatting.main_text);
          console.log(details.geometry.location.lat);
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
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    width: "90%",
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

export default GoogleSearchBar;
