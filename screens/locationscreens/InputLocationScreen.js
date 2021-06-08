// Navigates here after clicking next button on SelectPersonScreen
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  CheckBox,
  Text,
  Left,
  Right,
  Body,
  Footer,
  FooterTab,
} from "native-base";
import LocationElement from "./LocationElement";

const InputLocationScreen = ({ navigation, route }) => {
  const { people } = route.params;
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Text style={{ alignSelf: "center", paddingBottom: 20 }}>
          {" "}
          Where will y'all be before the outing?{" "}
        </Text>
        {people.map((person, i) =>
          person != 0 ? <LocationElement key={person} name={person} /> : null
        )}
      </Content>
      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-sharp" />
          </Button>
          <Button onPress={() => navigation.navigate("Preferences")}>
            <Icon name="caret-forward-sharp" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  question: {
    marginBottom: 15,
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 5,
  },
});

export default InputLocationScreen;
