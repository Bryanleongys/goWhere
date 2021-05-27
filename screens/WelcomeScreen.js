// First Screen on Mobile App
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
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
} from "native-base";

const WelcomeScreen = ({ navigation }) => {
  return (
    <Container style={styles.mainContainer}>
      <Content
        contentContainerStyle={{
          backgroundColor: "#bff6eb",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
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
            onPress={() => console.log("One-Time Use Account Pressed")}
          >
            <Text style={{ color: "#000000" }}>One-Time Use Account</Text>
          </Button>
        </Container>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#bff6eb",
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#bff6eb",
  },
  // container: {
  //   backgroundColor: "#bff6eb",
  //   flex: 1,
  // },
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
