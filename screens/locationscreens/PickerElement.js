// Location Element for InputLocationScreen
import React, { Component, useState, useRef, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  Icon,
  Form,
  Button,
  Left,
  Right,
  Body,
  Title,
  Item,
  Text,
  Input,
  Label,
  View,
} from "native-base";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { Picker } from "@react-native-picker/picker";
import LoadingScreen from "../common/LoadingScreen";

import config from "../../config";
const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

import BoxContainer from "./BoxContainer";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const PickerElement = ({
  navigation,
  name,
  colorCode,
  parentCallback,
  index,
}) => {
  GLOBAL = require("../global");
  const [selectedLocation, setSelectedLocation] = React.useState("others");

  // Data needed from picker
  const [locationName, setLocationName] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");
  const [latitude, setLatitude] = React.useState(null);
  const [longitude, setLongitude] = React.useState(null);

  const [currData, setData] = React.useState([]);
  const [init, setInit] = React.useState(0);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colorCode,
      height: 400,
      width: 350,
    },
  });

  React.useEffect(() => {
    console.log("Refreshed");
    axios
      .get(`${baseURL}cliques/getfriendlocation/${GLOBAL.USER.cliqueID}`, {
        params: {
          name: name,
        },
      })
      .then((res) => {
        console.log("Successfully GET request");
        setData(res.data);
        setInit({ init: 1 });
      })
      .catch((error) => {
        console.log("GET request failed");
      });
  }, []);

  // Google Search Bar
  const ref = useRef();
  useEffect(() => {
    ref.current?.setAddressText("");
  }, []);

  // if (selectedLocation != "others") {
  //   console.log("hello");
  //   setLatitude(currData[selectedLocation].latitude);
  //   setLongitude(currData[selectedLocation].longitude);
  //   setLocationName(currData[selectedLocation].locationName);
  //   setPostalCode(currData[selectedLocation].postalCode);
  // }

  // data to be sent
  var objectPass = {
    locationName: "",
    postalCode: "",
    latitude: null,
    longitude: null,
  };

  if (selectedLocation != "others") {
    objectPass = {
      personName: name,
      locationName: name + "'s " + currData[selectedLocation].locationName,
      postalCode: currData[selectedLocation].postalCode,
      latitude: currData[selectedLocation].latitude,
      longitude: currData[selectedLocation].longitude,
    };
  } else {
    objectPass = {
      personName: name,
      locationName: locationName + " (" + name + ")",
      postalCode: postalCode,
      latitude: latitude,
      longitude: longitude,
    };
  }

  const onTrigger = () => {
    parentCallback(objectPass, index);
  };

  return init ? (
    <View style={{ paddingBottom: 20 }}>
      <BoxContainer style={styles.container}>
        <Text style={{ position: "absolute", top: 20 }}> {name}: </Text>
        <Picker
          style={{
            width: 300,
            position: "absolute",
            top: 50,
          }}
          selectedValue={selectedLocation}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedLocation(itemValue);
          }}
        >
          {currData.map((location, index) => {
            return (
              <Picker.Item
                key={index}
                label={location.locationName}
                value={index}
              />
            );
          })}
          <Picker.Item label="Others" value="others" />
        </Picker>
        {selectedLocation == "others" ? (
          <Item style={styles2.searchBarContainer}>
            <GooglePlacesAutocomplete
              enablePoweredByContainer={false}
              ref={ref}
              placeholder="Name/Postal"
              fetchDetails={true}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                // setLocation(data.structured_formatting.main_text);
                setLatitude(details.geometry.location.lat);
                setLongitude(details.geometry.location.lng);
                setLocationName(data.structured_formatting.main_text);
                const postalNum = details?.address_components.find(
                  (addressComponent) =>
                    addressComponent.types.includes("postal_code")
                )?.short_name;
                setPostalCode(postalNum);
                console.log(details.place_id);
                console.log(postalNum);
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
        ) : null}
        {onTrigger()}
      </BoxContainer>
    </View>
  ) : (
    <LoadingScreen />
  );
};

const styles2 = StyleSheet.create({
  searchBarContainer: {
    position: "absolute",
    top: 250,
    zIndex: 1,
    width: "90%%",
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

export default PickerElement;
