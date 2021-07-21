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

const ChangePasswordScreen = ({ navigation }) => {
  GLOBAL = require("../global");
  // const [password, setPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPassword2, setNewPassword2] = React.useState("");
  const [buttonWord, setButtonWord] = React.useState(
    <Text style={{ fontFamily: "Avenir" }}>Change Password</Text>
  );

  const handleSubmit = () => {
    if (oldPassword == "" || newPassword == "" || newPassword2 == "") {
      return Alert.alert("Please fill in missing fields!");
    } else if (newPassword.length < 8) {
      return Alert.alert("Password too short!");
    } else if (newPassword != newPassword2) {
      return Alert.alert("Passwords mismatched. Please retype passwords.");
    }
    setButtonWord(<ActivityIndicator size="small" color="#0000ff" />);

    const userData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    axios
      .patch(`${baseURL}users/changepassword/${GLOBAL.USER.id}`, userData)
      .then((res) => {
        if (res.status == 200) {
          console.log("Successful change!");
          Alert.alert("Password has been changed!", "", [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ]);
        }
        // else if (res.status == 400)
      })
      .catch((error) => {
        setButtonWord(
          <Text style={{ fontFamily: "Avenir" }}>Change Password</Text>
        );
        if (error.message == "Request failed with status code 404") {
          Alert.alert("Please use another password.");
        } else if (error.message == "Request failed with status code 500") {
          Alert.alert("Old password is wrong.");
        }
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
          <Title style={{ fontSize: 17 }}>Change Password</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Old Password</Label>
            <Input
              name={"oldpassword"}
              id={"oldpassword"}
              value={oldPassword}
              onChangeText={(text) => setOldPassword(text)}
              secureTextEntry={true}
            />
          </Item>
        </Form>

        <Form>
          <Item floatingLabel>
            <Label>New Password</Label>
            <Input
              name={"newpassword"}
              id={"newpassword"}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              secureTextEntry={true}
            />
          </Item>
        </Form>

        <Form>
          <Item floatingLabel>
            <Label>Confirm New Password</Label>
            <Input
              name={"newpassword2"}
              id={"newpassword2"}
              value={newPassword2}
              onChangeText={(text) => setNewPassword2(text)}
              secureTextEntry={true}
            />
          </Item>
        </Form>
        <Button
          block
          style={{ margin: 15, marginTop: 50, backgroundColor: "#148972" }}
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

export default ChangePasswordScreen;
