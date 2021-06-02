// First Screen on Mobile App
import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
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
  Grid,
  Col,
  Item,
} from "native-base";

const WelcomeScreen = ({ navigation }) => {
  return (
    <Container style={styles.mainContainer}>
      <Content contentContainerStyle={styles.contentContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/pacman.png")}
        />
        <Text style={styles.text}> goWhere </Text>
        <Container style={styles.bottomView}>
          <Button
            full
            style={styles.loginButton}
            onPress={() => navigation.push("Login")}
          >
            <Text style={{ color: "#000000" }}>Log In</Text>
          </Button>
          <Button
            full
            style={styles.accountButton}
            onPress={() => navigation.push("CreateAccount")}
          >
            <Text style={{ color: "#000000" }}>Create Clique Account</Text>
          </Button>
          <Button
            full
            style={styles.oneButton}
            onPress={() => navigation.push("OneTime")}
          >
            <Text style={{ color: "#000000" }}>One-Time Use Account</Text>
          </Button>
        </Container>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    top: 150,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    fontSize: 40,
    fontFamily: "Courier New",
    width: 200,
    height: 200,
    top: 100,
    left: 5,
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#bff6eb",
  },
  contentContainer: {
    backgroundColor: "#bff6eb",
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#bff6eb",
  },
  loginButton: {
    backgroundColor: "#47d702",
  },
  accountButton: {
    backgroundColor: "#ffc002",
    alignSelf: null,
  },
  oneButton: {
    backgroundColor: "#fe7461",
    alignSelf: null,
  },
});

export default WelcomeScreen;
