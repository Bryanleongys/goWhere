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

const TimingScreen = ({ navigation, route }) => {
  const { objectArray } = route.params;
  const GLOBAL = require("../global");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var dd = date.getDate();
  var mmnumber = date.getMonth();
  var mm = monthNames[date.getMonth()];
  var yyyy = date.getFullYear();

  var hours = time.getHours();
  var minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = "0" + String(minutes);
  } else {
    minutes = String(minutes);
  }

  if (hours < 10) {
    hours = "0" + String(hours);
  } else {
    hours = String(hours);
  }

  var dateNum = yyyy * 10000 + (mmnumber + 1) * 100 + dd;
  var dateString = dd + " " + mm + " " + yyyy;
  var timeString = hours + minutes + "hrs";

  GLOBAL.OUTING_TIME.date = dateString;
  GLOBAL.OUTING_TIME.time = timeString;

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
        <Text style={styles.text}> Set date and time of your outing!</Text>
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
          {console.log("timing", objectArray)}
          <Button
            onPress={() =>
              navigation.navigate("GoogleMap", {
                dateString: dateString,
                timeString: timeString,
                dateNum: dateNum,
                objectArray: objectArray,
                time: time,
              })
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
  content: {
    backgroundColor: "#bff6eb",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#000000",
    paddingBottom: 15,
  },
});

export default TimingScreen;
