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
} from "native-base";

import PickerElement from "./PickerElement";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const InputLocationScreen = ({ navigation, route }) => {
  const { optionsArray } = route.params;
  const [currData, setData] = React.useState([]);
  const [init, setInit] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("Refreshed");
      axios
        .get(`${baseURL}cliques/getfriends/60cba472c5923607e63bacd7`)
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

  return init ? (
    <Container style={styles.container}>
      <ScrollView>
        <Content contentContainerStyle={styles.content}>
          <Text style={{ alignSelf: "center", paddingBottom: 20 }}>
            {" "}
            Where will y'all be before the outing?{" "}
          </Text>
          <Card style={{ width: 300, backgroundColor: "#86E7B8" }}>
            <CardItem bordered />
            {currData.map((person, i) => {
              return optionsArray[i] ? (
                <PickerElement key={i} name={person} navigation={navigation} />
              ) : null;
            })}
          </Card>
        </Content>
      </ScrollView>
      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-sharp" />
          </Button>
          <Button onPress={() => navigation.navigate("Preferences")}>
            <Icon name="caret-forward-sharp" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  ) : (
    <Text> Loading... </Text>
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
