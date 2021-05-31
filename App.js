import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DrawerRouter, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Welcome from "./screens/WelcomeScreen";
import Login from "./screens/LoginScreen";
import CreateAccount from "./screens/CreateAccScreen";
import Home from "./screens/HomeScreen";
import SelectPerson from "./screens/SelectPersonScreen";
import InputLocation from "./screens/InputLocationScreen";
import Preferences from "./screens/PreferencesScreen";
import Timing from "./screens/TimingScreen";
import UpdateClique from "./screens/UpdateCliqueScreen";
import TravelLog from "./screens/TravelLogScreen";
import AddTravel from "./screens/AddTravelScreen";
import GoogleMap from "./screens/GoogleMapScreen";
import OneTime from "./screens/OneTimeScreen";
import Notification from "./screens/NotificationScreen";
import Favourite from "./screens/FavouriteScreen";

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const LocationStack = createStackNavigator();
const CliqueStack = createStackNavigator();
const TravelStack = createStackNavigator();

const TravelStackScreen = () => {
  return (
    <TravelStack.Navigator
      initialRouteName="TravelScreen1"
      screenOptions={{ headerShown: false }}
    >
      <TravelStack.Screen name="TravelScreen1" component={TravelLog} />
      <TravelStack.Screen name="TravelScreen2" component={AddTravel} />
      <TravelStack.Screen name="Favourite" component={Favourite} />
    </TravelStack.Navigator>
  );
};

const CliqueStackScreen = () => {
  return (
    <CliqueStack.Navigator
      initialRouteName="CliqueScreen1"
      screenOptions={{ headerShown: false }}
    >
      <CliqueStack.Screen name="CliqueScreen1" component={UpdateClique} />
    </CliqueStack.Navigator>
  );
};

const LocationStackScreen = () => {
  return (
    <LocationStack.Navigator
      initialRouteName="LocationScreen1"
      screenOptions={{ headerShown: false }}
    >
      <LocationStack.Screen name="LocationScreen1" component={SelectPerson} />
      <LocationStack.Screen name="LocationScreen2" component={InputLocation} />
      <LocationStack.Screen name="Preferences" component={Preferences} />
      <LocationStack.Screen name="Timing" component={Timing} />
      <LocationStack.Screen name="GoogleMap" component={GoogleMap} />
      <LocationStack.Screen name="Notification" component={Notification} />
    </LocationStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <AuthStack.Screen name="Welcome" component={Welcome} />
        <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
        <AuthStack.Screen name="OneTime" component={OneTime} />
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Home" component={Home} />
        <AuthStack.Screen name="Location" component={LocationStackScreen} />
        <AuthStack.Screen name="Clique" component={CliqueStackScreen} />
        <AuthStack.Screen name="Travel" component={TravelStackScreen} />
      </AuthStack.Navigator>
      {/* <Drawer.Navigator>
        <Drawer.Screen name="Logout" component={Welcome} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
