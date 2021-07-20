import React, { Component, useState } from "react";
import { Alert, StyleSheet, ScrollView } from "react-native";
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
import GoogleSearchBar from "./GoogleSearchBar";

const InputLocationScreen = ({ navigation, route }) => {
  const { pax } = route.params;
  var inputs = [];
  var objectArray = new Array(pax);

  const handleCallback = (data, index) => {
    objectArray[index] = data;
  };

  for (var i = 0; i < pax; i++) {
    inputs.push(
      <GoogleSearchBar key={i} index={i} parentCallback={handleCallback} />
    );
  }

  const handlePress = () => {
    for (var i = 0; i < objectArray.length; i++) {
      if (
        objectArray[i] &&
        (objectArray[i].latitude == null || objectArray[i].longitude == null)
      ) {
        return Alert.alert("Please fill in missing fields!");
      }
    }
    return navigation.navigate("Timing", { objectArray: objectArray });
  };

  return (
    <Container style={styles.container} scrollEnabled={true}>
      <ScrollView keyboardShouldPersistTaps="always" listViewDisplayed={false}>
        <Content contentContainerStyle={styles.content} scrollEnabled={true}>
          <Text
            style={{
              alignSelf: "center",
              paddingBottom: 20,
              fontFamily: "Avenir",
              fontWeight: "bold",
            }}
          >
            Please input their respective locations.
          </Text>
          {inputs}
        </Content>
      </ScrollView>
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
    alignItems: "center",
  },
});

export default InputLocationScreen;
