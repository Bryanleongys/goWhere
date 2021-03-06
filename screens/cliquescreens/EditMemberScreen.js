// Navigates here after clicking member button on UpdateCliqueScreen
import React, { Component, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  CheckBox,
  Text,
  Left,
  Right,
  Body,
  Footer,
  FooterTab,
  Separator,
  Item,
  List,
  Form,
  Label,
  Input,
} from "native-base";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import SwipeEditMemberElement from "./SwipeEditMemberElement";
import "react-native-gesture-handler";
import LoadingScreen from "../common/LoadingScreen";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const EditMemberScreen = ({ route, navigation }) => {
  const name = route.params.paramKey;
  GLOBAL = require("../global");
  const [currData, setCurrData] = React.useState([]);
  const [init, setInit] = React.useState(0);
  const [buttonWord, setButtonWord] = useState(
    <Text style={{ fontFamily: "Avenir" }}>Add location</Text>
  );
  const [nameChange, setNameChange] = useState(name);
  console.log(nameChange);

  let friend = {
    name: name,
  };
  //console.log("test:", friend);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    setInit(0);
    console.log("Refreshed");
    const unsubscribe = navigation.addListener("focus", () => {
      axios
        .get(`${baseURL}cliques/getfriendlocation/${GLOBAL.USER.cliqueID}`, {
          params: friend,
        })
        .then((res) => {
          //console.log(res.data);
          console.log("Successfully GET request");
          setCurrData(res.data);
          setInit({ init: 1 });
        })
        .catch((error) => {
          console.error(error.message);
          console.log("GET request failed");
        });
    });
    return unsubscribe;
  }, [isFocused]);

  const handlePress = () => {
    navigation.navigate("CliqueScreen4", { friendName: friend.name });
  };

  const backPress = () => {
    const details = {
      oldName: name,
      newName: nameChange,
    };
    axios
      .patch(`${baseURL}cliques/changename/${GLOBAL.USER.cliqueID}`, details)
      .then((res) => {
        if (res.status == 200) {
          console.log("Changed name!");
        }
        // else if (res.status == 400)
      })
      .catch((error) => {
        console.log("Failed");
      });
    navigation.goBack();
  };

  const displayNull = () => {
    if (currData.length == 0) {
      return (
        <ListItem>
          <Text style={{ fontFamily: "Avenir" }}>NIL</Text>
        </ListItem>
      );
    }
    return;
  };

  return init ? (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={backPress}>
            <Icon style={{ color: "#148972" }} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Item
            rounded
            style={{ borderColor: "#148972", height: 30, width: 100 }}
          >
            <Input
              style={{ fontFamily: "Avenir" }}
              textAlign={"center"}
              value={nameChange}
              onChangeText={setNameChange}
            />
          </Item>
        </Body>
        <Right>
          <Button transparent onPress={handlePress}>
            <Icon style={{ color: "#148972" }} name="ios-add" />
          </Button>
        </Right>
      </Header>

      <Content>
        <List>
          <ListItem>
            <Text style={{ fontFamily: "Avenir", fontWeight: "bold" }}>
              {" "}
              Default Locations:
            </Text>
          </ListItem>
          {displayNull()}
        </List>
        <SwipeEditMemberElement
          inputArray={currData}
          navi={navigation}
          name={route.params.paramKey}
        />
      </Content>
    </Container>
  ) : (
    <LoadingScreen />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
  },
});

export default EditMemberScreen;
