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
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const OneTimeScreen = ({ navigation }) => {
  return (
    <Container style={styles.container}>
      <Header transparent style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="menu-sharp" style={{ color: "#323232" }} />
          </Button>
        </Left>
        <Body></Body>
        <Right />
      </Header>
      <Content
        padder
        contentContainerStyle={{
          backgroundColor: "#bff6eb",
          padding: 20,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ marginBottom: 20, alignSelf: "center" }}>
          Coming Soon!
        </Text>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
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

export default OneTimeScreen;
