// Navigates here after clicking Choose Location button on JomeScreen
import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
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
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import CheckboxElement from "./CheckboxElement";
import LoadingScreen from "../common/LoadingScreen";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const SelectPersonScreen2 = ({ navigation }) => {
  GLOBAL = require("../global");
  console.log(GLOBAL.USER.id);
  const [currData, setData] = React.useState([]);
  const [init, setInit] = React.useState(0);

  React.useEffect(() => {
    console.log("Refreshed");
    axios
      .get(`${baseURL}cliques/getfriends/${GLOBAL.USER.cliqueID}`)
      .then((res) => {
        console.log("Successfully GET request");
        setData(res.data);
        setInit({ init: 1 });
        if (res.data.length < 2) {
          Alert.alert("Add members under Clique Settings!", "", [
            {
              text: "OK",
              onPress: () => navigation.navigate("Home"),
            },
          ]);
        }
      })
      .catch((error) => {
        console.log("GET request failed");
      });
  }, []);

  const colorArray = ["#1BC09F", "#148972", "#0C5244", "#08372D"];

  let initArray = new Array(currData.length).fill(false);

  const [childData, setChildData] = React.useState();
  const handleCallback = (data, index) => {
    initArray[index] = data;
  };

  return init ? (
    <Container style={styles.container}>
      <Content padder contentContainerStyle={styles.contentContainer}>
        <Text style={styles.question}>Whose coming for this outing?</Text>
        {currData.map((people, index) => {
          return (
            <CheckboxElement
              key={index}
              name={people}
              color={colorArray[index]}
              parentCallback={handleCallback}
              index={index}
            />
          );
        })}
      </Content>
      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-sharp" />
          </Button>
          <Button
            onPress={() => {
              return initArray.filter(Boolean).length > 1
                ? navigation.navigate("LocationScreen2", {
                    optionsArray: initArray,
                  })
                : Alert.alert("How lonely! Select more people.");
            }}
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
  contentContainer: {
    backgroundColor: "#bff6eb",
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  button: {
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  question: {
    marginBottom: 20,
    alignSelf: "center",
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  text: {
    fontFamily: "Avenir",
    color: "#000",
  },
});

export default SelectPersonScreen2;
