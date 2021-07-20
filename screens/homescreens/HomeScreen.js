// Navigates here after Logging In
import React, { Component } from "react";
import { StyleSheet } from "react-native";
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
} from "native-base";

const HomeScreen = ({ navigation }) => {
  const GLOBAL = require("../global");
  return (
    <Container style={styles.container}>
      <Header transparent>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu-sharp" style={{ color: "#323232" }} />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={styles.header}>{GLOBAL.USER.name}</Title>
        </Body>
        <Right />
      </Header>
      <Content padder contentContainerStyle={styles.contentContainer}>
        <Text style={styles.textHead}>What would you like to do today?</Text>
        <Button
          rounded
          style={styles.startButton}
          onPress={() => navigation.navigate("Location")}
        >
          <Text style={styles.text}>Choose Location</Text>
        </Button>
        <Button
          rounded
          info
          style={styles.cliqueButton}
          onPress={() => navigation.navigate("Clique")}
        >
          <Text style={styles.text}>Change Clique Settings</Text>
        </Button>
        <Button
          rounded
          primary
          style={styles.preferencesButton}
          onPress={() => navigation.navigate("Travel")}
        >
          <Text style={styles.text}>Update Travel Log</Text>
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
  header: {
    fontSize: 20,
    fontFamily: "Marker Felt",
  },
  textHead: {
    marginBottom: 20,
    alignSelf: "center",
    fontWeight: "bold",
    fontFamily: "Avenir",
  },
  text: {
    fontFamily: "Avenir",
    color: "#000",
  },
  startButton: {
    backgroundColor: "#E9C46A",
    marginBottom: 20,
    alignSelf: "center",
  },
  cliqueButton: {
    backgroundColor: "#F4A261",
    marginBottom: 20,
    alignSelf: "center",
  },
  preferencesButton: {
    backgroundColor: "#E76F51",
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default HomeScreen;
