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
  Footer,
  FooterTab,
} from "native-base";
import LocationElement from "./LocationElement";

const PaxScreen = ({ navigation }) => {
  // const [text, setText] = useState();
  // const [list, setList] = useState(["Hello World"]);

  // const addItem = () => {
  //   const updatedList = list;
  //   updatedList.push(text);
  //   setList(updatedList);
  //   setText("");
  // };

  var [pax, onChangePax] = React.useState(null);

  var inputs = [];
  for (let i = 1; i <= pax; i++) {
    inputs.push(<LocationElement index={i} />);
  }

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.content}>
        <Text style={{ alignSelf: "center", paddingBottom: 20 }}>
          How many people will be going?
        </Text>
        <Form
          style={{
            alignSelf: "center",
            flexDirection: "row",
            paddingBottom: 20,
          }}
        >
          <Text style={{ alignSelf: "center" }}> Number of Pax:</Text>
          <Item fixedLabel style={{ width: 50, alignSelf: "center" }}>
            <Label style={{ alignSelf: "center" }} />
            <Input
              style={{ paddingBottom: 5 }}
              onChangeText={onChangePax}
              value={pax}
            />
          </Item>
        </Form>
        {inputs}
      </Content>
      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-sharp" />
          </Button>
          <Button onPress={() => navigation.navigate("PreferencesScreen")}>
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
