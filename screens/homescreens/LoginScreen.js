// Navigates here when Log In button is clicked on WelcomeScreen
import React, { Component, useState } from "react";
import { StyleSheet, ActivityIndicator, Alert } from "react-native";
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

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (email === "" || password === "") {
      return Alert.alert("Please fill in missing fields.");
    }

    let user = {
      email: email,
      password: password,
    };

    axios
      .post(`${baseURL}users/login`, user)
      .then((res) => {
        if (res.status == 200) {
          console.log("Successful login!");
          navigation.push("Home");
        }
        // else if (res.status == 400)
      })
      .catch((error) => {
        if (error.message == "Request failed with status code 400") {
          Alert.alert("Incorrect password.");
        } else if (error.message == "Request failed with status code 500") {
          Alert.alert("Account does not exist. Please create an account.");
        }
      });
  };
  // else {
  //   console.log("Successful login!");
  //   navigation.push("Home");
  //   }
  // };

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={{ fontSize: 17 }}>Log In</Title>
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
          <Item floatingLabel last>
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
          style={{ margin: 15, marginTop: 50 }}
          onPress={handleSubmit}
        >
          <Text>Sign In</Text>
        </Button>
        <Button
          onPress={() => navigation.navigate("ResetPassword")}
          style={{ alignSelf: "center", paddingBottom: 20 }}
          transparent
        >
          <Text> Forgot Password? </Text>
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

export default LoginScreen;
