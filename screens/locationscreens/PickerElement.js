// Location Element for InputLocationScreen
import React, { Component } from "react";
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

import { Picker } from "@react-native-picker/picker";
import LoadingScreen from "../common/LoadingScreen";
import GoogleSearchBar from "../common/GoogleSearchBar";

import BoxContainer from "./BoxContainer";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const PickerElement = ({ navigation, name, colorCode }) => {
  GLOBAL = require("../global");
  const [selectedLocation, setSelectedLocation] = React.useState("");

  const [currData, setData] = React.useState([]);
  const [init, setInit] = React.useState(0);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colorCode,
      height: 300,
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

  return init ? (
    <View style={{ paddingBottom: 20 }}>
      <BoxContainer style={styles.container}>
        <Text style={{ alignSelf: "center" }}> {name}: </Text>
        <Picker
          style={{ width: 200, alignSelf: "center" }}
          selectedValue={selectedLocation}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLocation(itemValue)
          }
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
        {selectedLocation == "others" ? <GoogleSearchBar /> : null}
      </BoxContainer>
    </View>
  ) : (
    <LoadingScreen />
  );
};

export default PickerElement;
