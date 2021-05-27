import React, { Component } from "react";
import { StyleSheet } from "react-native";
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

const peopleArray = ["Miss Minutes", "Loki", "Thor", "Drag Queen"];
var attendingArray = [];

class SelectPersonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
    };
  }
  toggleSwitch1() {
    this.setState({
      checkbox1: !this.state.checkbox1,
    });
    if (!Object.values(this.state)[0]) {
      attendingArray[0] = peopleArray[0];
    } else {
      attendingArray[0] = null;
    }
  }

  toggleSwitch2() {
    this.setState({
      checkbox2: !this.state.checkbox2,
    });
    if (!Object.values(this.state)[1]) {
      attendingArray[1] = peopleArray[1];
    } else {
      attendingArray[1] = null;
    }
  }

  toggleSwitch3() {
    this.setState({
      checkbox3: !this.state.checkbox3,
    });
    if (!Object.values(this.state)[2]) {
      attendingArray[2] = peopleArray[2];
    } else {
      attendingArray[2] = null;
    }
  }

  toggleSwitch4() {
    this.setState({
      checkbox4: !this.state.checkbox4,
    });
    if (!Object.values(this.state)[3]) {
      attendingArray[3] = peopleArray[3];
    } else {
      attendingArray[3] = null;
    }
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
          <Text style={styles.question}>Who do you wanna hang with?</Text>
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
              <Text style={styles.text}>Miss Minutes</Text>
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
              <Text style={styles.text}>Loki</Text>
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
              <Text style={styles.text}>Thor</Text>
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
              <Text style={styles.text}>Drag Queen</Text>
            </Body>
          </ListItem>
        </Content>
        <Footer style={styles.container}>
          <FooterTab>
            <Button onPress={() => this.props.navigation.goBack()}>
              <Icon name="caret-back-sharp" />
            </Button>
            <Button
              onPress={() => this.props.navigation.push("LocationScreen2")}
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
