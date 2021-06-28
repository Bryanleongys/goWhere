// Navigates here after clicking member button on UpdateCliqueScreen
import React, { Component, useState } from "react";
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
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const AddLocationScreen = ({ route, navigation }) => {
  GLOBAL = require("../global");
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = () => {
    if (location == "" || postalCode == "") {
      return Alert.alert("Please fill in missing fields");
    }

    let loc = {
      name: route.params.paramKey,
      locationName: location,
      postalCode: postalCode,
    };

    console.log(loc.name);
    axios
      .patch(`${baseURL}cliques/addlocation/${GLOBAL.USER.cliqueID}`, loc)
      .then((res) => {
        if (res.status == 200) {
          console.log("Location added!");
          setLocation("");
          setPostalCode("");
          return Alert.alert("Location added!");
        }
      })
      .catch((error) => {
        Alert.alert("Failed to add");
        console.log(error);
      });
  };

  const handlePress = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "CliqueScreen1" }],
      })
    );
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
          <Title style={{ fontSize: 17 }}>Member details</Title>
        </Body>
        <Right />
      </Header>

      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Location Name</Label>
            <Input value={location} onChangeText={setLocation} />
          </Item>
          <Item floatingLabel>
            <Label>Postal Code</Label>
            <Input value={postalCode} onChangeText={setPostalCode} />
          </Item>
        </Form>
        <Button
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={handleSubmit}
        >
          <Text>Add Location</Text>
        </Button>
        <Button
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={handlePress}
        >
          <Text>Done</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
  },
});

export default AddLocationScreen;
