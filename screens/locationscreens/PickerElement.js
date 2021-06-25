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
import "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const PickerElement = ({ navigation, name }) => {
  const [selectedLocation, setSelectedLocation] = React.useState("");

  const [currData, setData] = React.useState([]);
  const [init, setInit] = React.useState(0);

  React.useEffect(() => {
    console.log("Refreshed");
    axios
      .get(`${baseURL}cliques/getfriendlocation/60cba472c5923607e63bacd7`, {
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

  return (
    <View style={{ paddingBottom: 20 }}>
      <Text style={{ alignSelf: "center" }}> {name}: </Text>
      <Picker
        style={{ width: 200, alignSelf: "center" }}
        selectedValue={selectedLocation}
        onValueChange={(itemValue, itemIndex) => setSelectedLocation(itemValue)}
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
        <Item rounded style={{ alignSelf: "center", width: 200 }}>
          <Input placeholder="Input Postal Code" />
        </Item>
      ) : null}
    </View>
  );
};

export default PickerElement;
