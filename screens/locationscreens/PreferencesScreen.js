// Navigates here when clicking next button on InputLocationScreen
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

class SelectPersonScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    };
  }
  toggleSwitch1() {
    this.setState({
      checkbox1: !this.state.checkbox1,
    });
  }

  toggleSwitch2() {
    this.setState({
      checkbox2: !this.state.checkbox2,
    });
  }

  toggleSwitch3() {
    this.setState({
      checkbox3: !this.state.checkbox3,
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder contentContainerStyle={styles.contentContainer}>
          <Text style={styles.question}>
            Pick your preferred type of location:
          </Text>
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
              <Text style={styles.text}>Lower crowd levels</Text>
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
              <Text style={styles.text}>Higher ratings</Text>
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
              <Text style={styles.text}>
                Have not been there before (travel log)
              </Text>
            </Body>
          </ListItem>
        </Content>
        <Footer style={styles.container}>
          <FooterTab>
            <Button onPress={() => this.props.navigation.goBack()}>
              <Icon name="caret-back-outline" />
            </Button>
            <Button onPress={() => this.props.navigation.push("Timing")}>
              <Icon name="caret-forward-outline" />
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
  contentContainer: {
    backgroundColor: "#bff6eb",
    padding: 20,
    flex: 1,
    justifyContent: "center",
  },
  question: {
    marginBottom: 15,
    alignSelf: "center",
    alignItems: "center",
  },
  button: {
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    marginBottom: 5,
  },
});

export default SelectPersonScreen;
