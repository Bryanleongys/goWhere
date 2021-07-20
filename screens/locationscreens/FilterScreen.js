import React, { useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  useState,
  Top,
  Alert,
  Image,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Input,
  Item,
  Text,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Title,
  Footer,
  FooterTab,
  List,
  ListItem,
  CheckBox,
} from "native-base";
import "react-native-gesture-handler";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Picker } from "@react-native-picker/picker";

const FilterScreen = ({ navigation, route }) => {
  // min value - ratingsValue[0], max value - ratingsValue[1]
  const [ratingsValue, setRatingsValue] = React.useState([0, 5]);
  const [locationType, setLocationType] = React.useState("restaurant");
  const [includeLog, setIncludeLog] = React.useState(false);
  const {
    inputRatingsValue,
    inputLocationType,
    inputIncludeLog,
    includeLogOption,
  } = route.params;

  useEffect(() => {
    setRatingsValue(inputRatingsValue);
    setLocationType(inputLocationType);
    setIncludeLog(inputIncludeLog);
  }, []);

  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor: "#bff6eb" }}>
        <Left>
          <Button
            transparent
            onPress={() =>
              navigation.navigate("GoogleMap", {
                ratingsValue: ratingsValue,
                locationType: locationType,
                includeLog: includeLog,
              })
            }
          >
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body style={{ alignSelf: "center", flex: 3 }}>
          <Title style={{ fontFamily: "Avenir" }}>Filters</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <List>
          <ListItem>
            <Text style={styles.textHeader}>Type of Place</Text>
          </ListItem>
          <Picker
            selectedValue={locationType}
            onValueChange={(itemValue, itemIndex) => setLocationType(itemValue)}
          >
            <Picker.Item label="Dining" value="restaurant|cafe" />
            <Picker.Item label="Bar" value="bar|night_club" />
            <Picker.Item
              label="Shopping Mall"
              value="shopping_mall|department_store"
            />
            <Picker.Item label="Museum" value="museum|art_gallery" />
            <Picker.Item label="Park" value="park" />
            <Picker.Item label="Clothing Store" value="clothing_store" />
            <Picker.Item label="Gym" value="gym" />
          </Picker>
          <ListItem></ListItem>
          {includeLogOption ? (
            <ListItem>
              <Text style={styles.textHeader}>Travel History</Text>
            </ListItem>
          ) : null}
          {includeLogOption ? (
            <ListItem
              button
              onPress={() => setIncludeLog(!includeLog)}
              style={styles.button}
            >
              <CheckBox
                checked={includeLog}
                onPress={() => setIncludeLog(!includeLog)}
                style={styles.button}
              />
              <Body>
                <Text style={styles.text}>Consider Travel Log</Text>
              </Body>
            </ListItem>
          ) : null}

          <ListItem>
            <Text style={styles.textHeader}>Range Selections</Text>
          </ListItem>
          <ListItem style={{ flexDirection: "column", alignItems: "center" }}>
            <View
              style={{
                paddingTop: 40,
                flexDirection: "row",
                alignItems: "center",
                flex: 1,
                justifyContent: "flex-start",
              }}
            >
              <Text style={{ paddingRight: 23, fontFamily: "Avenir" }}>
                Ratings{" "}
              </Text>
              <MultiSlider
                values={[ratingsValue[0], ratingsValue[1]]}
                sliderLength={250}
                onValuesChange={(values) => {
                  setRatingsValue(values);
                }}
                min={0}
                max={5}
                step={0.5}
                allowOverlap={true}
                enableLabel={true}
              />
            </View>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
    fontFamily: "Avenir",
  },
  textHeader: {
    fontWeight: "bold",
    fontFamily: "Avenir",
    alignSelf: "center",
  },
  button: {
    marginBottom: 5,
    alignSelf: "center",
    alignItems: "center",
  },
  listItem: {
    backgroundColor: "#bff6eb",
  },
});

export default FilterScreen;
