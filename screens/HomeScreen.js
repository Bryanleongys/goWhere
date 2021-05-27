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
import { useNavigation } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  return (
    <Container style={styles.container}>
      <Header transparent>
        <Left>
          <Button
            transparent
            onPress={() => console.log("Menu Button Pressed")}
          >
            <Icon name="menu-sharp" style={{ color: "#323232" }} />
          </Button>
        </Left>
        <Body>
          <Title></Title>
        </Body>
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
          What would you like to do today?
        </Text>
        <Button
          rounded
          style={styles.startButton}
          onPress={() => navigation.navigate("Location")}
        >
          <Text style={{ color: "#000000" }}>Choose Location</Text>
        </Button>
        <Button
          rounded
          info
          style={styles.cliqueButton}
          onPress={() => navigation.navigate("Clique")}
        >
          <Text style={{ color: "#000000" }}>Change Clique Settings</Text>
        </Button>
        <Button
          rounded
          primary
          style={styles.preferencesButton}
          onPress={() => navigation.navigate("Travel")}
        >
          <Text style={{ color: "#000000" }}>Update Travel Log</Text>
        </Button>
      </Content>
      {/* Footer Tab */}
      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-outline" />
          </Button>
          <Button></Button>
        </FooterTab>
      </Footer>
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

export default HomeScreen;
