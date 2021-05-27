// Navigates here after selecting "Time" on PreferencesScreen
import React, { useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Footer,
  FooterTab,
  Icon,
  Container,
  Button,
  Text,
  Content,
  List,
} from "native-base";

const TimingScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShow(Platform.OS === "ios");
    setTime(currentTime);
  };

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Text
          style={{
            fontSize: 18,
            color: "#000000",
            paddingBottom: 15,
          }}
        >
          {" "}
          Set date and time of your outing!
        </Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
          style={{ width: 130, alignSelf: "center", paddingTop: 50 }}
        />
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
          style={{
            width: 85,
            alignSelf: "center",
            paddingTop: 50,
          }}
        />
      </Content>
      <Footer style={{ backgroundColor: "#bff6eb" }}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-outline" />
          </Button>
          <Button onPress={() => console.log("Button Pressed")}>
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
  content: {
    backgroundColor: "#bff6eb",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TimingScreen;
