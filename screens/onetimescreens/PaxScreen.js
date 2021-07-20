import React, { Component, useState } from "react";
import { Alert, StyleSheet } from "react-native";
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
  Footer,
  FooterTab,
} from "native-base";
import LocationElement from "./LocationElement";

const PaxScreen = ({ navigation }) => {
  var [pax, onChangePax] = React.useState(null);

  const handlePress = () => {
    if (/^[A-Za-z ]+$/.test(pax)) {
      return Alert.alert("Please enter valid input.");
    }
    if (pax < 2 || pax == null) {
      return Alert.alert("Too little people!");
    }
    return navigation.navigate("InputLocation", {
      pax: pax,
    });
  };
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Text
          style={{
            alignSelf: "center",
            paddingBottom: 20,
            fontFamily: "Avenir",
            fontWeight: "bold",
          }}
        >
          How many people will be going?
        </Text>
        <Form
          style={{
            alignSelf: "center",
            flexDirection: "row",
            paddingBottom: 20,
          }}
        >
          <Text style={{ alignSelf: "center", fontFamily: "Avenir" }}>
            {" "}
            Number of Pax:
          </Text>
          <Item fixedLabel style={{ width: 50, alignSelf: "center" }}>
            <Label style={{ alignSelf: "center" }} />
            <Input
              style={{ paddingBottom: 5 }}
              onChangeText={onChangePax}
              value={pax}
            />
          </Item>
        </Form>
      </Content>
      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-sharp" />
          </Button>
          <Button onPress={handlePress}>
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
});

export default PaxScreen;
