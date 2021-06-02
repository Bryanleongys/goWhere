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

const LoginScreen = ({ navigation }) => {
  handlePress = () => {
    if (true) {
      navigation.push("Home");
    }
  };

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{ fontSize: 17 }}>Log In</Title>
        </Body>
        <Right />
      </Header>

      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Clique's Username</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input secureTextEntry />
          </Item>
        </Form>
        <Button
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={handlePress}
        >
          <Text>Sign In</Text>
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
