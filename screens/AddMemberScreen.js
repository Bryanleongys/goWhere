// Navigates here after clicking plus button on UpdateCliqueScreen
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
// import {
//   InputText,
//   InputCountrySelector,
//   InputSwitch,
// } from "react-native-input-list";

const AddMemberScreen = ({ navigation }) => {
  handlePress = () => {
    if (true) {
      console.log(works);
    }
  };

  showValues = () => {
    const firstValue = `First input: ${this.refs.firstInput.value()}\n`;
    const secondValue = `Second input: ${this.refs.secondInput.value()}\n`;
    const thirdValue = `Third input: ${this.refs.thirdInput.value()}\n`;

    const text = firstValue + secondValue + thirdValue;

    Alert.alert("Values", text);
  };

  areValid = () => {
    const firstValid = `First input: ${!!this.refs.firstInput.valid()}\n`;
    const secondValid = `Second input: ${!!this.refs.secondInput.valid()}\n`;
    const thirdValid = `Third input: ${!!this.refs.thirdInput.valid()}\n`;

    const text = firstValid + secondValid + thirdValid;

    Alert.alert("Valid?", text);
  };

  showErrors = () => {
    this.refs.firstInput.showError();
    this.refs.secondInput.showError();
    this.refs.thirdInput.showError();
    this.refs.fourthInput.showError();
    this.refs.fifthInput.showError();
  };

  switchChanged = (value) => {
    alert(value);
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
        <Right>
          <Button transparent onPress={() => console.log("Add location")}>
            <Icon name="ios-add" />
          </Button>
        </Right>
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
          <Text>Add</Text>
        </Button>
        {/* <View>
          <InputText
            ref="firstInput"
            required
            type="withLabel"
            label="With label"
          />
          <InputText ref="secondInput" label="Without label" />
          <InputText ref="thirdInput" keyboardType="numeric" label="Numeric" />
        </View>
        <View>
          <TouchableOpacity onPress={this.showValues}>
            <Text style={styles.action}>SHOW VALUES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.areValid}>
            <Text style={styles.action}>VALID?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showErrors}>
            <Text style={styles.action}>SHOW ERRORS</Text>
          </TouchableOpacity>
        </View> */}
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bff6eb",
  },
});

export default AddMemberScreen;
