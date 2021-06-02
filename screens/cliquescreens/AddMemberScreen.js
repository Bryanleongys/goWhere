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
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import {
//   InputText,
//   InputCountrySelector,
//   InputSwitch,
// } from "react-native-input-list";

const AddMemberScreen = ({ navigation }) => {
  GLOBAL = require("../global");
  const [member, setMember] = useState("");

  const alertPress = () => {
    GLOBAL.MEMBERSARRAY[Object.keys(GLOBAL.MEMBERSARRAY).length] = [member];
    console.log(member);
    navigation.navigate("Home");
  };

  const handlePress = () => {
    return Alert.alert("Member Added!", "", [
      {
        text: "OK",
        onPress: alertPress,
        // navigation.navigate({
        //   name: "TravelScreen1",
        //   params: {
        //     date: dateString,
        //     location: location,
        //   },
        //   merge: true,
        // }),
      },
    ]);
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
            <Input value={member} onChangeText={setMember} />
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
