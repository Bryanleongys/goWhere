// Location Element for InputLocationScreen
import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Icon,
  Picker,
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
// import { Picker } from "@react-native-picker/picker";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const LocationElement = ({ navigation }) => {
  let name = "Bryan";
  const [selected, setSelected] = React.useState(undefined);
  const [currData, setData] = React.useState([]);
  const [init, setInit] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
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
          if (error.message == "Request failed with status code 500") {
            return console.log("friend does not exist");
          }
          console.log("GET request failed");
        });
    });
    return unsubscribe;
  }, [navigation]);
  console.log(currData);

  let listLocation = [];
  for (var i = 0; i < currData.length; i++) {
    listLocation.push(currData[i].locationName);
  }

  function make_list(listLocation) {
    listLocation.map((data, i) => {
      return <Picker.Item key={i} label={data} value={data} />;
    });
  }

  return init ? (
    <View style={{ paddingBottom: 20 }}>
      <Item style={{ alignSelf: "center", paddingBottom: 10 }}>
        <Text> {name}: </Text>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          placeholder="Location"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          style={{ width: undefined }}
          selectedValue={selected}
          onValueChange={setSelected.bind(selected)}
          style={{ alignSelf: "center" }}
          renderHeader={(backAction) => (
            <Header style={{ backgroundColor: "#bff6eb" }}>
              <Left>
                <Button transparent onPress={backAction}>
                  <Icon name="arrow-back" style={{ color: "#000000" }} />
                </Button>
              </Left>
              <Body style={{ flex: 3 }}>
                <Title style={{ color: "#000000" }}>{name}'s Location </Title>
              </Body>
              <Right />
            </Header>
          )}
        >
          {console.log(currData)}
          {/* {make_list} */}
        </Picker>
      </Item>
      {/* {selected == "otherkey" ? (
        <Item rounded style={{ alignSelf: "center", width: 250 }}>
          <Input placeholder="Input 6-digit Postal Code" />
        </Item>
      ) : null} */}
    </View>
  ) : (
    <Text> Loading... </Text>
  );
};

export default LocationElement;
