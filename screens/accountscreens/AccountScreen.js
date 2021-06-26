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
          <Title style={{ fontSize: 20 }}>Account Settings</Title>
        </Body>
        <Right />
      </Header>
      <Content padder contentContainerStyle={styles.contentContainer}>
        <Button
          rounded
          style={styles.startButton}
          onPress={() => navigation.push("ChangePassword")}
        >
          <Text style={{ color: "#000000" }}>Change Password</Text>
        </Button>
        <Button
          rounded
          info
          style={styles.cliqueButton}
          onPress={() => navigation.push("ChangeEmail")}
        >
          <Text style={{ color: "#000000" }}>Change Email Address</Text>
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
  startButton: {
    backgroundColor: "#47d702",
    marginBottom: 20,
    alignSelf: "center",
  },
  cliqueButton: {
    backgroundColor: "#ffc002",
    marginBottom: 20,
    alignSelf: "center",
  },
  preferencesButton: {
    backgroundColor: "#fe7461",
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default AccountScreen;
