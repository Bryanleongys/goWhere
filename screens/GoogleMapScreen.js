import * as React from "react";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
} from "react-native-maps";
import { StyleSheet, Dimensions, View, useState } from "react-native";
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
} from "native-base";

const GoogleMapScreen = ({ navigation }) => {
  const state = {
    coordinates: [
      // {
      //   name: "1",
      //   latitude: 1.3579294997441924,
      //   longitude: 103.81196521563633,
      // }, // Singapore
      {
        name: "VivoCity",
        latitude: 1.264639175987083,
        longitude: 103.822228554653,
      },
      {
        name: "Parkway Parade",
        latitude: 1.301583298620964,
        longitude: 103.90523329698091,
      },
      {
        name: "NEX Mall",
        latitude: 1.3510726229232952,
        longitude: 103.87225849698069,
      },
      {
        name: "J-Cube",
        latitude: 1.3335245176414159,
        longitude: 103.74017773930859,
      },
    ],
  };

  return (
    <Container>
      <Container style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 1.3579294997441924,
            longitude: 103.81196521563633,
            latitudeDelta: 1,
            longitudeDelta: 0.5,
          }}
        >
          {state.coordinates.map((marker) => (
            <Marker
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}
            ></Marker>
          ))}
          <Polygon
            coordinates={state.coordinates}
            fillColor={"rgba(100, 100, 200, 0.3)"}
          />
        </MapView>
      </Container>
      <Footer style={styles.container}>
        <FooterTab>
          <Button onPress={() => navigation.goBack()}>
            <Icon name="caret-back-sharp" />
          </Button>
          <Button onPress={() => console.log("Refresh Button Pressed")}>
            <Icon name="ios-refresh-outline" />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default GoogleMapScreen;
