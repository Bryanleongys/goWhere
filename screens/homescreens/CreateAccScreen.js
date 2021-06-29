// Navigates here when Create Account button clicked from Welcome Screen
import React, { Component } from "react";
import { StyleSheet, Alert, ActivityIndicator } from "react-native";
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
  Stack,
  Center,
  NativeBaseProvider,
} from "native-base";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const CreateAccount = ({ navigation }) => {
  // Read user input
  const [username, onChangeUsername] = React.useState("");
  const [password1, onChangePassword1] = React.useState("");
  const [password2, onChangePassword2] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [buttonWord, setButtonWord] = React.useState(
    <Text>Create Account</Text>
  );

  // Alert if account created successfully
  handlePress = () => {
    if (email == "" || username == "" || password1 == "" || password2 == "") {
      return Alert.alert("Please fill in missing fields.");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return Alert.alert("Please enter a valid email.");
    } else if (password1.length < 8) {
      return Alert.alert("Password too short!");
    } else if (password1 != password2) {
      return Alert.alert("Passwords mismatched. Please retype passwords.");
    }
    let user = {
      name: username,
      email: email,
      password: password1,
      isAdmin: true,
    };
    setButtonWord(<ActivityIndicator size="small" color="#0000ff" />);

    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Alert.alert("Account successfully created!", null, [
            {
              text: "OK",
              onPress: navigation.goBack(),
            },
          ]);
        }
      })
      .catch((error) => {
        setButtonWord(<Text>Create Account</Text>);
        if (error.message == "Request failed with status code 400") {
          // try to find better code?
          return Alert.alert("Email is already in use.");
        }
        Alert.alert("Something went wrong");
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
          <Title style={{ fontSize: 17 }}>Create Account</Title>
        </Body>
        <Right />
      </Header>

      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email Address</Label>
            <Input
              onChangeText={(text) => onChangeEmail(text.toLowerCase())}
              value={email}
            />
          </Item>
          <Item floatingLabel>
            <Label>Clique's Username</Label>
            <Input
              onChangeText={(text) => onChangeUsername(text)}
              value={username}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={(text) => onChangePassword1(text)}
              value={password1}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Confirm Password</Label>
            <Input
              secureTextEntry
              onChangeText={(text) => onChangePassword2(text)}
              value={password2}
            />
          </Item>
        </Form>
        <Button
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={handlePress}
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
});

export default CreateAccount;
