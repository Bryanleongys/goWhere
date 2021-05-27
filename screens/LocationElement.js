// Location Element for InputLocationScreen
import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Icon,
  Picker,
  Form,
  Button,
  Left,
  Right,
  Body,
  Title,
  Item,
  Text,
  Input,
  Label,
  View,
} from "native-base";

export default class PickerPlaceholderExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value,
    });
  }
  render() {
    return (
      <View style={{ paddingBottom: 20 }}>
        <Item style={{ alignSelf: "center", paddingBottom: 10 }}>
          <Text> {this.props.name}: </Text>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            placeholder="Location"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            style={{ width: undefined }}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
            style={{ alignSelf: "center" }}
            renderHeader={(backAction) => (
              <Header style={{ backgroundColor: "#bff6eb" }}>
                <Left>
                  <Button transparent onPress={backAction}>
                    <Icon name="arrow-back" style={{ color: "#000000" }} />
                  </Button>
                </Left>
                <Body style={{ flex: 3 }}>
                  <Title style={{ color: "#000000" }}>
                    {this.props.name}'s Location{" "}
                  </Title>
                </Body>
                <Right />
              </Header>
            )}
          >
            <Picker.Item label="Home" value="key0" />
            <Picker.Item label="Home 2" value="key1" />
            <Picker.Item label="Work" value="key2" />
            <Picker.Item label="Study" value="key3" />
            <Picker.Item label="Others" value="key4" />
          </Picker>
        </Item>
        {this.state.selected == "key4" ? (
          <Item rounded style={{ alignSelf: "center", width: 250 }}>
            <Input placeholder="Input 6-digit Postal Code" />
          </Item>
        ) : null}
      </View>
    );
  }
}
