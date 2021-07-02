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
    const [location, setLocation] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [buttonWord, setButtonWord] = React.useState(<Text>Edit Location</Text>);

    const ref = useRef();

    console.log(route.params.paramKey);
    const handleSubmit = () => {
        // if (location == "" || postalCode == "") {
        //     return Alert.alert("Please fill in missing fields");
        // }

        let inputDelete = {
            name: route.params.paramKey.name,
            locationName: route.params.paramKey.locationName
          };

        console.log("Deleting");  
        axios.patch(
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
            locationName: location,
            postalCode: postalCode
        };

        console.log("adding");
        axios
      .patch(`${baseURL}cliques/addlocation/${GLOBAL.USER.cliqueID}`, loc)
      .then((res) => {
        if (res.status == 200) {
          console.log("Location added!");
          setLocation("");
          setPostalCode("");
          setButtonWord(<Text>Add Location</Text>);
          return Alert.alert("Changes Successful!");
        }
      })
      .catch((error) => {
        setButtonWord(<Text>Add Location</Text>);
        Alert.alert("Failed to add");
        console.log(error);
      });

     navigation.navigate("CliqueScreen1");
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
          <Content contentContainerStyle={{ paddingLeft: 10, paddingTop: 10 }}>
            <Item floatingLabel>
              <Label>Location Name</Label>
              <Input value={location} onChangeText={setLocation} />
            </Item>
            <Item style={styles.searchBarContainer}>
              <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                enablePoweredByContainer={false}
                ref={ref}
                placeholder="Name/Postal"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(details);
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