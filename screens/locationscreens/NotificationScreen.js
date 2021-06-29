import React, { useState } from "react";
import { View, Share, StyleSheet } from "react-native";
import {
  Container,
  Button,
  Text,
  Content,
  Footer,
  FooterTab,
  Icon,
  Item,
  Input,
} from "native-base";
import { CommonActions } from "@react-navigation/native";

const NotificationScreen = ({ navigation, route }) => {
  const { markerName, dateString, timeString } = route.params;
  const GLOBAL = require("../global");
  const MESSAGE =
    "Meet at  " + markerName + ", " + dateString + ", " + timeString + ".";
  const [messageInput, setText] = useState(MESSAGE);

  const onShare = async () => {
    try {
      await Share.share({
        title: "React Native Share",
        message: messageInput,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Item style={{ height: 75, flexWrap: "wrap" }} regular>
          <Input
            style={{ height: 75 }}
            onChangeText={(messageInput) => setText(messageInput)}
            defaultValue={messageInput}
            multiline={true}
          />
        </Item>
        <Button
          style={{ alignSelf: "center" }}
          transparent
          onPress={() => onShare()}
        >
          <Text>Share</Text>
        </Button>
      </Content>
      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-sharp" />
          </Button>
          <Button
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "Home" }],
                })
              )
            }
          >
            <Icon name="home" />
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
    paddingTop: 10,
  },
  content: {
    flex: 1,
    backgroundColor: "#bff6eb",
    justifyContent: "center",
  },
});

export default NotificationScreen;
