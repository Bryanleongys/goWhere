import React, { Component } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Footer,
  FooterTab,
  Form,
  Item,
  Label,
  Input,
} from "native-base";

import { Alert } from "react-native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const ChangeEmailScreen = ({ navigation }) => {
  GLOBAL = require("../global");
  const [email, setEmail] = React.useState("");
  const [buttonWord, setButtonWord] = React.useState(
    <Text>Change Email Address</Text>
  );

  React.useEffect(() => {
    console.log("Refreshed");
    axios
      .get(`${baseURL}users/email/${GLOBAL.USER.id}`)
      .then((res) => {
        console.log("Successfully GET request");
        setEmail(res.data);
      })
      .catch((error) => {
        console.log("GET request failed");
      });
  }, []);

  const handleSubmit = () => {
    setButtonWord(<ActivityIndicator size="small" color="#0000ff" />);
    axios
      .patch(`${baseURL}users/changeemail/${GLOBAL.USER.id}`, { email: email })
      .then((res) => {
        if (res.status == 200) {
          console.log("Successful change!");
          Alert.alert("Email has been changed!", "", [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
        }
        // else if (res.status == 400)
      })
      .catch((error) => {
        setButtonWord(<Text>Change Email Address</Text>);
        if (error.message == "Request failed with status code 404") {
          Alert.alert("Please use another email.");
        } else if (error.message == "Request failed with status code 500") {
          Alert.alert("Email is already in use.");
        }
        console.log("Failed");
      });
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
          <Title style={{ fontSize: 17 }}>Change Email Address</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email Address</Label>
            <Input
              name={"email"}
              id={"email"}
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
          </Item>
        </Form>
        <Button
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={handleSubmit}
        >
          {buttonWord}
        </Button>
      </Content>
    </Container>
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
    alignItems: "center",
    alignSelf: "center",
  },
  startButton: {
    backgroundColor: "#47d702",
    marginBottom: 20,
    alignSelf: "center",
  },
  cliqueButton: {
    backgroundColor: "#ffc002",
    marginBottom: 20,
    alignSelf: "center",
  },
  preferencesButton: {
    backgroundColor: "#fe7461",
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default ChangeEmailScreen;
