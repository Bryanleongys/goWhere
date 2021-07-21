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
import { Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
// import {
//   InputText,
//   InputCountrySelector,
//   InputSwitch,
// } from "react-native-input-list";

const AddMemberScreen = ({ navigation }) => {
  GLOBAL = require("../global");
  const [member, setMember] = useState("");
  const [location, setLocation] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [buttonWord, setButtonWord] = useState(
    <Text style={{ fontFamily: "Avenir" }}>Add Member</Text>
  );

  // const alertPress = () => {
  //   console.log(Object.keys(GLOBAL.MEMBERSARRAY1).length)
  //   GLOBAL.MEMBERSARRAY1[Object.keys(GLOBAL.MEMBERSARRAY1).length] = member;
  //   console.log(Object.keys(GLOBAL.MEMBERSARRAY1)[Object.keys(GLOBAL.MEMBERSARRAY1).length - 1]);
  //   navigation.navigate("Home");
  // };

  const handleSubmit = () => {
    if (member == "") {
      return Alert.alert("Please fill in missing fields");
    }

    let friend = {
      name: member,
    };
    setButtonWord(<ActivityIndicator size="small" color="#0000ff" />);
    axios
      .patch(`${baseURL}cliques/addmember/${GLOBAL.USER.cliqueID}`, friend)
      .then((res) => {
        if (res.status == 200) {
          setButtonWord(<Text>Add Member</Text>);
          console.log("Friend added!");
          navigation.navigate("CliqueScreen4", { paramKey: friend.name });
        }
        return Alert.alert("Member added!");
      })
      .catch((error) => {
        setButtonWord(<Text style={{ fontFamily: "Avenir" }}>Add Member</Text>);
        if (error.message == "Request failed with status code 404") {
          return Alert.alert("Member already exists!");
        }
        console.log(error);
      });
  };

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={{ color: "#148972" }} name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ flex: 3 }}>
          <Title style={{ fontSize: 17, fontFamily: "Avenir" }}>
            Member Details
          </Title>
        </Body>
        <Right />
      </Header>

      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Members Name</Label>
            <Input onChangeText={setMember} />
          </Item>
        </Form>
        {/* <Button
          block
          style={{ margin: 15, marginTop: 50 }}
          onPress={() => navigation.navigate("CliqueScreen4")}
        >
          <Text>Add Location</Text>
        </Button> */}
        <Button
          block
          style={{ margin: 15, marginTop: 50, backgroundColor: "#148972" }}
          onPress={handleSubmit}
        >
          {buttonWord}
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
