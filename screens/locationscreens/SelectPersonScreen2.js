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

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const SelectPersonScreen2 = ({ navigation }) => {
  GLOBAL = require("../global");
  const [currData, setData] = React.useState([]);
  const [init, setInit] = React.useState(0);

  React.useEffect(() => {
    console.log("Refreshed");
    axios
      .get(`${baseURL}cliques/getfriends/${GLOBAL.CLIQUEID}`)
      .then((res) => {
        console.log("Successfully GET request");
        setData(res.data);
        setInit({ init: 1 });
      })
      .catch((error) => {
        console.log("GET request failed");
      });
  }, []);

  const colorArray = ["#053225", "#E2C044", "#56CBF9", "#FF729F", "#4E4B5C"];

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
            onPress={() =>
              navigation.navigate("LocationScreen2", {
                optionsArray: initArray,
              })
            }
          >
            <Icon name="caret-forward-sharp" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  ) : (
    <Text style={{ justifyContent: "center", flex: 1 }}>Loading...</Text>
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
    marginBottom: 15,
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 5,
  },
});

export default SelectPersonScreen2;
