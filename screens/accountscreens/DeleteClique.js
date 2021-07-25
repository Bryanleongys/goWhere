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

const DeleteCliqueScreen = ({ navigation }) => {
  GLOBAL = require("../global");
  const [password, setPassword] = React.useState("");
  const [buttonWord, setButtonWord] = React.useState(
    <Text style={{ fontFamily: "Avenir" }}>Delete Clique</Text>
  );

  const handleSubmit = () => {
    setButtonWord(<ActivityIndicator size="small" color="#fff" />);
    axios
      .delete(`${baseURL}users/delete/${GLOBAL.USER.id}`, {
        params: { password: password },
      })
      .then((res) => {
        if (res.status == 200) {
          console.log("Successful deletion!");
          navigation.push("Welcome");
        }
      })
      .catch((error) => {
        setButtonWord(
          <Text style={{ fontFamily: "Avenir" }}>Delete Clique</Text>
        );
        if (error.message == "Request failed with status code 404") {
          Alert.alert("Password is wrong.");
        }
        Alert.alert("Password is wrong.");
        console.log("Failed");
      });
  };

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{ color: "#148972" }} name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={{ fontSize: 17, fontFamily: "Avenir" }}>
            Delete Clique
          </Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              name={"password"}
              id={"password"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </Item>
        </Form>
        <Button
          block
          style={{
            margin: 15,
            marginTop: 50,
            width: 300,
            alignSelf: "center",
            backgroundColor: "#ff2f30",
          }}
          onPress={() => {
            Alert.alert(
              "Are you sure you want to delete your clique?",
              "This action is irreversible",
              [
                {
                  text: "DELETE",
                  onPress: () => handleSubmit(),
                },
                {
                  text: "NO",
                },
              ]
            );
          }}
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

export default DeleteCliqueScreen;
