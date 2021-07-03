// Navigates here after clicking next button on SelectPersonScreen
import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
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
  Card,
  CardItem,
  Item,
  Label,
} from "native-base";

import PickerElement from "./PickerElement";
import LoadingScreen from "../common/LoadingScreen";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const InputLocationScreen = ({ navigation, route }) => {
  GLOBAL = require("../global");
  console.log(GLOBAL.USER.cliqueID);
  const { optionsArray } = route.params;
  const [currData, setData] = React.useState([]);
  const [init, setInit] = React.useState(0);

  const colorArray = ["#8AEEDA", "#53E6C9", "#1FDBB6", "#17A488"];

  var objectArray = new Array(currData.length);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Refreshed");
      axios
        .get(`${baseURL}cliques/getfriends/${GLOBAL.USER.cliqueID}`)
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

  const handleCallback = (data, index) => {
    objectArray[index] = data;
  };

  return init ? (
    <Container style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" listViewDisplayed={false}>
        <Content contentContainerStyle={styles.content}>
          <Text style={{ alignSelf: "center", paddingBottom: 20 }}>
            {" "}
            Where will y'all be before the outing?{" "}
          </Text>
          {currData.map((person, i) => {
            const colorIndex = i % colorArray.length;
            return optionsArray[i] ? (
              <PickerElement
                key={i}
                name={person}
                navigation={navigation}
                colorCode={colorArray[colorIndex]}
                index={i}
                parentCallback={handleCallback}
              />
            ) : null;
          })}
        </Content>
      </ScrollView>

      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-sharp" />
          </Button>
          <Button
            onPress={() =>
              navigation.navigate("Preferences", { objectArray: objectArray })
            }
          >
            <Icon name="caret-forward-sharp" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  ) : (
    <LoadingScreen />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  question: {
    marginBottom: 15,
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 5,
  },
});

export default InputLocationScreen;
