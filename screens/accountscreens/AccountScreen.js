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

const AccountScreen = ({ navigation }) => {
  return (
    <Container style={styles.container}>
      <Header transparent>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu-sharp" style={{ color: "#323232" }} />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={{ fontSize: 20, fontFamily: "Avenir" }}>
            Account Settings
          </Title>
        </Body>
        <Right />
      </Header>
      <Content padder contentContainerStyle={styles.contentContainer}>
        <Button
          rounded
          style={styles.startButton}
          onPress={() => navigation.push("ChangePassword")}
        >
          <Text style={styles.text}>Change Password</Text>
        </Button>
        <Button
          rounded
          info
          style={styles.cliqueButton}
          onPress={() => navigation.push("ChangeEmail")}
        >
          <Text style={styles.text}>Change Email Address</Text>
        </Button>
        <Button
          rounded
          primary
          style={styles.preferencesButton}
          onPress={() => navigation.push("DeleteClique")}
        >
          <Text style={styles.text}>Delete Clique</Text>
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
  text: {
    fontFamily: "Avenir",
    color: "#fff",
  },
  startButton: {
    backgroundColor: "#1BC09F",
    marginBottom: 20,
    alignSelf: "center",
  },
  cliqueButton: {
    backgroundColor: "#148972",
    marginBottom: 20,
    alignSelf: "center",
  },
  preferencesButton: {
    backgroundColor: "#0C5244",
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default AccountScreen;
