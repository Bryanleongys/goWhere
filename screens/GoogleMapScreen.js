// Navigates here when Update Clique button is clicked on HomeScreen
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
  Item,
  Input,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

class UpdateCliqueScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.container}>
          <Body>
            <Title>Google Maps</Title>
          </Body>
        </Header>
        <Content padding>
          <Item>
            <Icon active name="home" />
            <Input placeholder="Icon Textbox" />
          </Item>
          <Item>
            <Input placeholder="Icon Alignment in Textbox" />
            <Icon active name="swap" />
          </Item>
        </Content>
        <Footer style={styles.container}>
          <FooterTab>
            <Button onPress={() => this.props.navigation.goBack()}>
              <Icon name="caret-back-sharp" />
            </Button>
            <Button onPress={() => console.log("Refresh Button Pressed")}>
              <Icon name="ios-refresh-outline" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
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

export default UpdateCliqueScreen;
