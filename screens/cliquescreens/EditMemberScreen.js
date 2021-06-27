// Navigates here after clicking member button on UpdateCliqueScreen
import React, { Component, useState } from "react";
import { StyleSheet } from "react-native";
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
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const EditMemberScreen = ({ route, navigation }) => {
  const handlePress = () => {
    if (true) {
      console.log(works);
    }
  };

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{ fontSize: 17 }}>Member details</Title>
        </Body>
        <Right />
      </Header>

      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Members Name</Label>
            <Input />
          </Item>
          
        </Form>
        <Button
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={handlePress}
        >
          <Text>Done</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
  },
});

export default EditMemberScreen;
