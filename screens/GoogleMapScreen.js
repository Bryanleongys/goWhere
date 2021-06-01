import React, { useEffect, useRef } from "react";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
} from "react-native-maps";
import {
  StyleSheet,
  Dimensions,
  View,
  useState,
  Top,
  Alert,
  Image,
} from "react-native";
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
  Footer,
  FooterTab,
} from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CommonActions } from "@react-navigation/native";
import config from "../config";

const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;
console.log(GOOGLE_PLACES_API_KEY);

const GoogleMapScreen = ({ navigation }) => {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText("Some Text");
  }, []);

  const handlePress = () => {
    return Alert.alert(
      "Far East Plaza Selected!",
      "Would you like to send reminders to your friends?",
      [
        { text: "Yes", onPress: () => navigation.push("Notification") },
        {
          text: "No",
          onPress: () =>
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "Home" }],
              })
            ),
        },
      ]
    );
  };

  const state = {
    coordinates: [
      // {
      //   name: "1",
      //   latitude: 1.3579294997441924,
      //   longitude: 103.81196521563633,
      // }, // Singapore
      {
        name: "VivoCity",
        latitude: 1.264639175987083,
        longitude: 103.822228554653,
      },
      {
        name: "Parkway Parade",
        latitude: 1.301583298620964,
        longitude: 103.90523329698091,
      },
      {
        name: "NEX Mall",
        latitude: 1.3510726229232952,
        longitude: 103.87225849698069,
      },
      {
        name: "J-Cube",
        latitude: 1.3335245176414159,
        longitude: 103.74017773930859,
      },
    ],
  };

  // Calculating midpoint
  var total_longitude = 0;
  var total_latitude = 0;
  for (var i = 0; i < 4; i++) {
    total_longitude += state.coordinates[i].longitude;
    total_latitude += state.coordinates[i].latitude;
  }

  const central_coordinate = {
    name: "Central",
    latitude: total_latitude / 4,
    longitude: total_longitude / 4,
  };

  return (
    <Container>
      <Header style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Search Location"
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: GOOGLE_PLACES_API_KEY,
            language: "en",
          }}
        />
      </Header>
      <Container style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 1.3579294997441924,
            longitude: 103.81196521563633,
            latitudeDelta: 1,
            longitudeDelta: 0.5,
          }}
        >
          {state.coordinates.map((marker) => (
            <Marker
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}
            ></Marker>
          ))}
          {/* Midpoint Marker */}
          <Marker
            key={central_coordinate.name}
            coordinate={{
              latitude: central_coordinate.latitude,
              longitude: central_coordinate.longitude,
            }}
            title={central_coordinate.name}
          >
            <Image
              style={{ height: 60, width: 60 }}
              source={require("../assets/pacman.png")}
            />
          </Marker>
          <Polygon
            coordinates={state.coordinates}
            fillColor={"rgba(100, 100, 200, 0.2)"}
          />
        </MapView>
      </Container>
      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-sharp" />
          </Button>
          <Button onPress={() => console.log("Refresh Button Pressed")}>
            <Icon name="ios-refresh-outline" />
          </Button>
          <Button onPress={handlePress}>
            <Icon name="checkmark-outline" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
    paddingTop: 10,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default GoogleMapScreen;
