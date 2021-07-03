// Navigates here when clicking next button on InputLocationScreen
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
import { useNavigation } from "@react-navigation/native";

function GoToButton() {
  const navigation = useNavigation();
  return navigation.navigate.goBack();
}

const PreferencesScreen = ({ navigation, route }) => {
  const { objectArray } = route.params;
  const [checkbox1, setCheckbox1] = React.useState(false);
  const [checkbox2, setCheckbox2] = React.useState(false);
  const [checkbox3, setCheckbox3] = React.useState(false);

  return (
    <Container style={styles.container}>
      <Content padder contentContainerStyle={styles.contentContainer}>
        <Text style={styles.question}>
          Pick your preferred type of location:
        </Text>
        <ListItem
          button
          onPress={() => setCheckbox1(!checkbox1)}
          style={styles.button}
        >
          <CheckBox
            checked={checkbox1}
            onPress={() => setCheckbox1(!checkbox1)}
            style={styles.button}
          />
          <Body>
            <Text style={styles.text}>Lower crowd levels</Text>
          </Body>
        </ListItem>
        <ListItem
          button
          onPress={() => setCheckbox2(!checkbox2)}
          style={styles.button}
        >
          <CheckBox
            color="red"
            checked={checkbox2}
            onPress={() => setCheckbox2(!checkbox2)}
            style={styles.button}
          />
          <Body>
            <Text style={styles.text}>Higher ratings</Text>
          </Body>
        </ListItem>
        <ListItem
          button
          onPress={() => setCheckbox3(!checkbox3)}
          style={styles.button}
        >
          <CheckBox
            color="green"
            checked={checkbox3}
            onPress={() => setCheckbox1(!checkbox1)}
            style={styles.button}
          />
          <Body>
            <Text style={styles.text}>
              Have not been there before (travel log)
            </Text>
          </Body>
        </ListItem>
      </Content>
      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-outline" />
          </Button>
          <Button
            onPress={() =>
              navigation.navigate("Timing", { objectArray: objectArray })
            }
          >
            <Icon name="caret-forward-outline" />
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
  contentContainer: {
    backgroundColor: "#bff6eb",
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  question: {
    marginBottom: 15,
    alignSelf: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 5,
  },
});

export default PreferencesScreen;
