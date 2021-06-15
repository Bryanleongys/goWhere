// Navigates here when Create Account button clicked from Welcome Screen
import React, { Component } from "react";
import { StyleSheet, Alert } from "react-native";
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
  const [username, onChangeUsername] = React.useState(null);
  const [password1, onChangePassword1] = React.useState(null);
  const [password2, onChangePassword2] = React.useState(null);
  const [email, onChangeEmail] = React.useState(null);

  // Alert if account created successfully
  handlePress = () => {
    if (username == null || password1 == null || password2 == null) {
      return Alert.alert("Please fill in missing fields.");
    } else if (password1 != password2) {
      return Alert.alert("Passwords mismatched. Please retype passwords.");
    }
    let user = {
      name: username,
      email: email,
      password: password1,
      isAdmin: false,
    };

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
        console.log(error);
        Alert.alert("Something went wrong");
      });
  };

  // for server

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
            <Input onChangeText={onChangeUsername} value={username} />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={onChangePassword1}
              value={password1}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Confirm Password</Label>
            <Input
              secureTextEntry
              onChangeText={onChangePassword2}
              value={password2}
            />
          </Item>
        </Form>
        <Button
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={handlePress}
        >
          <Text>Create Account</Text>
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
