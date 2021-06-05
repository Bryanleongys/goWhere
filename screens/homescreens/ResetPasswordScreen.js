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

const ResetPasswordScreen = ({ navigation }) => {
  handlePress = () => {
    Alert.alert(
      "Password has been reset!",
      "Please check your inbox to verify.",
      [
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
      ]
    );
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
          <Title style={{ fontSize: 17 }}>Reset Password</Title>
        </Body>
        <Right />
      </Header>

      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email address</Label>
            <Input />
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
