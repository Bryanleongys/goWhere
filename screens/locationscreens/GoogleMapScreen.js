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
import config from "../../config";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;
console.log(GOOGLE_PLACES_API_KEY);

const GoogleMapScreen = ({ navigation, route }) => {
  const GLOBAL = require("../global");
  const [postalCode, setPostalCode] = React.useState(null);
  const { dateString, timeString, dateNum, objectArray } = route.params;
  // const [marker, setMarker] = React.useState({
  //   latitude: 1.264639175987081,
  //   longitude: 103.822228554651,
  // });
  console.log(objectArray);

  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText("");
  }, []);

  const handlePress = () => {
    let locationDetails = {
      date: dateString,
      dateNum: dateNum,
      locationName: markerName,
      postalCode: postalCode, // figure out how to get from google api
      longitude: markerLong,
      latitude: markerLat,
    };
    axios
      .patch(
        `${baseURL}cliques/addlog/${GLOBAL.USER.cliqueID}`,
        locationDetails
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("Location successfully added!");
        }
      });
    return Alert.alert(
      markerName + " Selected!",
      "Would you like to send reminders to your friends?",
      [
        {
          text: "Yes",
          onPress: () =>
            navigation.navigate("Notification", {
              markerName: markerName,
              dateString: dateString,
              timeString: timeString,
            }),
        },
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

  // Calculating midpoint
  var total_longitude = 0;
  var total_latitude = 0;
  for (var i = 0; i < objectArray.length; i++) {
    total_longitude += objectArray[i].longitude;
    total_latitude += objectArray[i].latitude;
  }

  const central_coordinate = {
    name: "Central",
    latitude: total_latitude / objectArray.length,
    longitude: total_longitude / objectArray.length,
  };

  const [markerLat, setMarkerLat] = React.useState(central_coordinate.latitude);
  const [markerLong, setMarkerLong] = React.useState(
    central_coordinate.longitude
  );
  const [markerName, setMarkerName] = React.useState("Central");

  return (
    <Container>
      <Content style={{ backgroundColor: "#bff6eb" }} scrollEnabled={false}>
        <Item style={styles.searchBarContainer}>
          <GooglePlacesAutocomplete
            isRowScrollable={false}
            enablePoweredByContainer={false}
            styles={{
              textInput: {
                backgroundColor: "#ffffff",
              },
              row: {
                backgroundColor: "#bff6eb",
              },
            }}
            ref={ref}
            fetchDetails={true}
            placeholder="Search Location"
            onPress={(data, details, types = null) => {
              // 'details' is provided when fetchDetails = true
              // const zipCode = details?.address_components.find(
              //   (addressComponent) =>
              //     addressComponent.types.includes("postal_code")
              // )?.short_name;
              setMarkerLat(details.geometry.location.lat);
              setMarkerLong(details.geometry.location.lng);
              setMarkerName(data.structured_formatting.main_text);
              const postalNum = details?.address_components.find(
                (addressComponent) =>
                  addressComponent.types.includes("postal_code")
              )?.short_name;
              setPostalCode(postalNum);
            }}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: "en",
              components: "country:sg",
            }}
          />
        </Item>
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
          {objectArray.map((marker) => (
            <Marker
              key={marker.postalCode}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.locationName}
            ></Marker>
          ))}
          {/* Midpoint Marker */}
          <Marker
            key={central_coordinate.name}
            coordinate={{
              latitude: markerLat,
              longitude: markerLong,
            }}
            title={markerName}
          >
            <Image
              style={{ height: 60, width: 60 }}
              source={require("../../assets/pacman.png")}
            />
          </Marker>
          {/* <Marker
            draggable
            coordinate={marker}
            onDragEnd={(e) => setMarker(e.nativeEvent.coordinate)}
          /> */}
          <Polygon
            coordinates={objectArray}
            fillColor={"rgba(100, 100, 200, 0.2)"}
          />
        </MapView>
      </Content>
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
  searchBarContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
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

export default GoogleMapScreen;
