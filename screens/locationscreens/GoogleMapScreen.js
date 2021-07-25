import React, { useEffect, useRef, useCallback } from "react";
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
  List,
  ListItem,
} from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useIsFocused } from "@react-navigation/native";
import LoadingScreen from "../common/LoadingScreen";
import { CommonActions } from "@react-navigation/native";
import getNearbyLocations2 from "../../algorithm/getNearbyLocations2";
import getPostalCode2 from "../../algorithm/getPostalCode2";
import filterLocations from "../../algorithm/filterLocations";
import config from "../../config";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const GOOGLE_PLACES_API_KEY = config.GOOGLE_PLACES_API_KEY;

const GoogleMapScreen = ({ navigation, route }) => {
  const GLOBAL = require("../global");
  const [postalCode, setPostalCode] = React.useState(null);
  const [placeId, setPlaceId] = React.useState(null);
  const { dateString, timeString, dateNum, objectArray, time } = route.params;

  // Solve react navigation repeat bug
  for (var i = 0; i < objectArray.length; i++) {
    if (i > 0) {
      if (objectArray[i].personName == objectArray[i - 1].personName) {
        objectArray.splice(i, 1);
      }
    }
  }
  var { ratingsValue, locationType, includeLog } = route.params;

  if (
    ratingsValue == undefined ||
    locationType == undefined ||
    includeLog == undefined
  ) {
    ratingsValue = [0, 5];
    locationType = "restaurant";
    includeLog = false;
  }

  const [travelLogArray, setTravelLogArray] = React.useState([]);
  const [init, setInit] = React.useState(0);

  //console.log("travelLog array: ", travelLogArray);

  const handlePress = () => {
    if (postalCode == null || placeId == null || markerName == "N/A") {
      return Alert.alert("No location selected! Please select a location.");
    }
    let locationDetails = {
      date: dateString,
      dateNum: dateNum,
      locationName: markerName,
      postalCode: postalCode,
      longitude: markerLong,
      latitude: markerLat,
      placeId: placeId,
    };
    console.log(locationDetails);
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
              postalCode: postalCode,
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
    if (objectArray[i]) {
      total_longitude += objectArray[i].longitude;
      total_latitude += objectArray[i].latitude;
    }
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

  // Showing route from start to end location
  const [nearbyArray, setNearbyArray] = React.useState([]);
  const [timeArray, setTimeArray] = React.useState([]);

  // Inputs for getDistanceMatrix

  // for origins
  var startLoc = ``;
  for (var i = 0; i < objectArray.length; i++) {
    startLoc =
      startLoc + `${objectArray[i].latitude},${objectArray[i].longitude}|`;
  }

  // for destinations
  const centralLoc = `${central_coordinate.latitude},${central_coordinate.longitude}`; // midpoint
  const isFocused = useIsFocused();
  const ref = useRef();

  React.useEffect(() => {
    setNearbyArray([]);
    setPostalCode(null);
    setPlaceId(null);
    setMarkerName("N/A");
    setInit(0);
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Refreshed");
      axios
        .get(`${baseURL}cliques/getlogs/${GLOBAL.USER.cliqueID}`)
        .then((res) => {
          console.log("Successfully GET request");
          setTravelLogArray(res.data);
          ref.current?.setAddressText("");
          getNearbyLocations2(centralLoc, locationType).then((data) => {
            getPostalCode2(data).then((data2) => {
              var data3 = filterLocations(
                data2,
                res.data,
                ratingsValue,
                includeLog
              );
              if (!data3.length) {
                Alert.alert(
                  "No location available. Please select other filters."
                );
                return setInit(1);
              }
              setNearbyArray(data3);
              setPostalCode(data3[0].postalCode);
              setMarkerName(data3[0].name);
              setMarkerLat(data3[0].latitude);
              setMarkerLong(data3[0].longitude);
              setPlaceId(data3[0].placeId);
              setInit(1);
            });
          });
        })
        .catch((error) => {
          console.log("GET request failed");
        });
    });

    // });
    return unsubscribe;
  }, [isFocused]);
  // console.log(nearbyArray);

  // Marker position - select top 3 locations
  var locationsArray = [];
  if (nearbyArray.length) {
    for (var i = 0; i < 3; i++) {
      locationsArray.push(nearbyArray[i]);
    }
  }

  const changeMarkerPosition = (
    name,
    longitude,
    latitude,
    postalCode,
    placeId
  ) => {
    setMarkerLong(longitude);
    setMarkerLat(latitude);
    setMarkerName(name);
    setPostalCode(postalCode);
    setPlaceId(placeId);
  };

  return (
    <Container>
      <Header style={{ height: 50, backgroundColor: "#bff6eb" }}>
        <Left />

        <Body style={{ flex: 3 }}>
          <Title style={{ fontFamily: "Avenir" }}>Central Locations</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() =>
              navigation.navigate("TimeRoute", {
                objectArray: objectArray,
                markerLat: markerLat,
                markerLong: markerLong,
                locationName: markerName,
                placeId: placeId,
                time: time,
              })
            }
          >
            <Icon style={{ color: "#148972" }} name="git-branch" />
          </Button>
        </Right>
      </Header>
      <Content style={styles.content2} scrollEnabled={true}>
        <List style={{ alignItems: "center" }}>
          <ListItem style={{ height: 100 }}>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontFamily: "Avenir",
              }}
            >
              {" "}
              Selected Location: {markerName}
            </Text>
          </ListItem>
        </List>
        {init ? (
          nearbyArray.map((location, index) => {
            return (
              <List>
                <ListItem
                  onPress={() =>
                    changeMarkerPosition(
                      location.name,
                      location.longitude,
                      location.latitude,
                      location.postalCode,
                      location.placeId
                    )
                  }
                  underlayColor={"#00c6bb"}
                >
                  <Text style={{ fontFamily: "Avenir" }}>
                    {index + 1}. {location.name}
                  </Text>
                </ListItem>
              </List>
            );
          })
        ) : (
          <LoadingScreen />
        )}

        <Content style={{ paddingTop: 20 }}>
          <Button
            onPress={() =>
              navigation.navigate("Filter", {
                inputRatingsValue: ratingsValue,
                inputLocationType: locationType,
                inputIncludeLog: includeLog,
                includeLogOption: true,
              })
            }
            style={{
              alignSelf: "center",
              height: 35,
              backgroundColor: "#148972",
            }}
          >
            <Text style={{ fontFamily: "Avenir" }}>Change Filters</Text>
          </Button>
        </Content>
      </Content>
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
              listView: {
                height: 135,
              },
            }}
            ref={ref}
            fetchDetails={true}
            placeholder="Select Other Locations"
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
              setPlaceId(details.place_id);
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
            latitudeDelta: 0.25,
            longitudeDelta: 0.5,
          }}
        >
          {objectArray.map((marker, index) => (
            <Marker
              key={index}
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
          {/* <Polygon
            coordinates={objectArray}
            fillColor={"rgba(100, 100, 200, 0.2)"}
          /> */}
        </MapView>
      </Content>
      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-sharp" />
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
  content2: {
    backgroundColor: "#bff6eb",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
  searchBarContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
  },
  button: {
    backgroundColor: "#17A488",
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
