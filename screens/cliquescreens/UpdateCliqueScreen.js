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
  Separator,
  Item,
  List,
} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import SwipeMemberElement from "./SwipeMemberElement";
import "../global.js";

class UpdateCliqueScreen extends Component {
  render() {
    GLOBAL = require("../global");
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "#bff6eb" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Members</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => this.props.navigation.push("CliqueScreen2")}
            >
              <Icon name="ios-add" />
            </Button>
          </Right>
        </Header>
        <Content>
          {Object.keys(GLOBAL.MEMBERSARRAY).map((date, index) => {
            return (
              <Content>
                <List>
                  <SwipeMemberElement
                    inputArray={Object.values(GLOBAL.MEMBERSARRAY)[index]}
                  />
                </List>
              </Content>
            );
          })}
          <SwipeListView></SwipeListView>
        </Content>
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
