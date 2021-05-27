// Navigates here when plus button is pressed from Travel Log Screen
import React, { Component, useState } from "react";
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Text,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Title,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddTravelScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  return (
    <Container>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Add Location</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content>
        <Item regular>
          <Text> Postal Code: </Text>
          <Input />
        </Item>
        <Item>
          <Text> Date of Outing: </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChange}
            style={{ width: 130, alignSelf: "center", paddingTop: 50 }}
          />
        </Item>
      </Content>
    </Container>
  );
};

export default AddTravelScreen;
