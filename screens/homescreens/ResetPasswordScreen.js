// Navigates here when Log In button is clicked on WelcomeScreen
import React, { Component } from "react";
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
import { NavigationHelpersContext } from "@react-navigation/core";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const handlePress = () => {
    if (email == "" || password == "" || password2 == "") {
      return Alert.alert("Please fill in missing fields!");
    }
    if (password != password2) {
      return Alert.alert("Passwords mismatch. Please key in again.");
    }
    const userData = {
      email: email,
      password: password,
    };
    axios
      .patch(`${baseURL}users/resetpassword`, userData)
      .then((res) => {
        if (res.status == 200) {
          console.log("Successful change!");
          Alert.alert("Password has been reset!", "", [
            {
              text: "OK",
              onPress: () =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{ name: "Welcome" }],
                  })
                ),
            },
          ]);
        }
      })
      .catch((error) => {
        if (error.message == "Request failed with status code 400") {
          Alert.alert("Email does not exist.");
        }
        console.log("Failed");
      });
  };
  // [
  //   {
  //     text: "OK",
  //     onPress: () =>
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 1,
  //           routes: [{ name: "Welcome" }],
  //         })
  //       ),
  //   },
  // ];

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={{ fontSize: 17 }}>Reset Password</Title>
        </Body>
        <Right />
      </Header>

      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email address</Label>
            <Input
              name={"email"}
              id={"email"}
              value={email}
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
          </Item>
          <Item floatingLabel>
            <Label>New Password</Label>
            <Input
              name={"password"}
              id={"password"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </Item>
          <Item floatingLabel>
            <Label>Confirm New Password</Label>
            <Input
              name={"password2"}
              id={"password2"}
              value={password2}
              onChangeText={(text) => setPassword2(text)}
              secureTextEntry={true}
            />
          </Item>
        </Form>
        <Button
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={handlePress}
        >
          <Text>Reset Password</Text>
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

export default ResetPasswordScreen;
