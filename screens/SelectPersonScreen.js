// Navigates here after clicking Choose Location button on JomeScreen
import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
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
} from "native-base";
import { useNavigation } from "@react-navigation/native";

function GoToButton() {
  const navigation = useNavigation();
  return navigation.navigate.goBack();
}

const peopleArray = ["Bryan", "Mukund", "Sheryl", "Zhi Ling", "Ben"];
var attendingArray = [];
var length;
// const id = attendingArray.indexOf(peopleArray[0]);
// attendingArray.splice(id, 1);

class SelectPersonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false,
    };
    attendingArray = [0, 0, 0, 0, 0]; //initialize as 0 values
    length = 0;
  }

  toggleSwitch1() {
    this.setState({
      checkbox1: !this.state.checkbox1,
    });
    if (!Object.values(this.state)[0]) {
      attendingArray[0] = peopleArray[0];
      length += 1;
    } else {
      attendingArray[0] = 0;
      length -= 1;
    }
    console.log(attendingArray, length);
  }

  toggleSwitch2() {
    this.setState({
      checkbox2: !this.state.checkbox2,
    });
    if (!Object.values(this.state)[1]) {
      attendingArray[1] = peopleArray[1];
      length += 1;
    } else {
      attendingArray[1] = 0;
      length -= 1;
    }
    console.log(attendingArray);
  }

  toggleSwitch3() {
    this.setState({
      checkbox3: !this.state.checkbox3,
    });
    if (!Object.values(this.state)[2]) {
      attendingArray[2] = peopleArray[2];
      length += 1;
    } else {
      attendingArray[2] = 0;
      length -= 1;
    }
    console.log(attendingArray);
  }

  toggleSwitch4() {
    this.setState({
      checkbox4: !this.state.checkbox4,
    });
    if (!Object.values(this.state)[3]) {
      attendingArray[3] = peopleArray[3];
      length += 1;
    } else {
      attendingArray[3] = 0;
      length -= 1;
    }
    console.log(attendingArray);
  }
  toggleSwitch5() {
    this.setState({
      checkbox5: !this.state.checkbox5,
    });
    if (!Object.values(this.state)[4]) {
      attendingArray[4] = peopleArray[4];
      length += 1;
    } else {
      attendingArray[4] = 0;
      length -= 1;
    }
    console.log(attendingArray);
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content
          padder
          contentContainerStyle={{
            backgroundColor: "#bff6eb",
            padding: 20,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={styles.question}>Whose coming for this outing?</Text>
          <ListItem
            button
            onPress={() => this.toggleSwitch1()}
            style={styles.button}
          >
            <CheckBox
              checked={this.state.checkbox1}
              onPress={() => this.toggleSwitch1()}
              style={styles.button}
            />
            <Body>
              <Text style={styles.text}>Bryan</Text>
            </Body>
          </ListItem>
          <ListItem
            button
            onPress={() => this.toggleSwitch2()}
            style={styles.button}
          >
            <CheckBox
              color="red"
              checked={this.state.checkbox2}
              onPress={() => this.toggleSwitch2()}
              style={styles.button}
            />
            <Body>
              <Text style={styles.text}>Mukund</Text>
            </Body>
          </ListItem>
          <ListItem
            button
            onPress={() => this.toggleSwitch3()}
            style={styles.button}
          >
            <CheckBox
              color="green"
              checked={this.state.checkbox3}
              onPress={() => this.toggleSwitch3()}
              style={styles.button}
            />
            <Body>
              <Text style={styles.text}>Sheryl</Text>
            </Body>
          </ListItem>
          <ListItem
            button
            onPress={() => this.toggleSwitch4()}
            style={styles.button}
          >
            <CheckBox
              color="#000"
              checked={this.state.checkbox4}
              onPress={() => this.toggleSwitch4()}
              style={styles.button}
            />
            <Body>
              <Text style={styles.text}>Zhi Ling</Text>
            </Body>
          </ListItem>
          <ListItem
            button
            onPress={() => this.toggleSwitch5()}
            style={styles.button}
          >
            <CheckBox
              color="#000"
              checked={this.state.checkbox5}
              onPress={() => this.toggleSwitch5()}
              style={styles.button}
            />
            <Body>
              <Text style={styles.text}>Ben</Text>
            </Body>
          </ListItem>
        </Content>
        <Footer style={styles.container}>
          <FooterTab>
            <Button onPress={() => this.props.navigation.goBack()}>
              <Icon name="caret-back-sharp" />
            </Button>
            <Button
              onPress={
                length >= 2
                  ? () =>
                      this.props.navigation.navigate("LocationScreen2", {
                        people: attendingArray,
                      })
                  : () => Alert.alert("How lonely! Select more people.")
              }
            >
              <Icon name="caret-forward-sharp" />
            </Button>
          </FooterTab>
        </Footer>
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

export default SelectPersonScreen;
