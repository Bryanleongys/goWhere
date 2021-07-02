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
} from "native-base";
import SwipeEditMemberElement from "./SwipeEditMemberElement";
import "react-native-gesture-handler";
import LoadingScreen from "../common/LoadingScreen";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const EditMemberScreen = ({ route, navigation }) => {
  GLOBAL = require("../global");
  const [currData, setCurrData] = React.useState([]);
  const [init, setInit] = React.useState(0);
  const [buttonWord, setButtonWord] = useState(<Text>Add location</Text>);
  
  let friend = {
    name: route.params.paramKey
  };
  //console.log("test:", friend);
  React.useEffect(() => {
    console.log("Refreshed");
    axios
      .get(`${baseURL}cliques/getfriendlocation/${GLOBAL.USER.cliqueID}`,
        { params: friend })
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
  }, []);

  const handlePress = () => {
    navigation.navigate("CliqueScreen4", { paramKey: friend.name });
  };

  return init ? (
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
        <Button
        block
          style={{ margin: 15, marginTop: 50 }}
          onPress={handlePress}
        >
          {buttonWord}
        </Button>

        <SwipeEditMemberElement 
          inputArray={currData}
          navi={navigation} 
          name={ route.params.paramKey }/>
      </Content>
    </Container>
  ) : (<Text>Loading...</Text>);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
  },
});

export default EditMemberScreen;
