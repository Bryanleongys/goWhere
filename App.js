import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DrawerRouter, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Welcome from "./screens/homescreens/WelcomeScreen";
import Login from "./screens/homescreens/LoginScreen";
import CreateAccount from "./screens/homescreens/CreateAccScreen";
import Home from "./screens/homescreens/HomeScreen";
import SelectPerson from "./screens/locationscreens/SelectPersonScreen";
import InputLocation from "./screens/locationscreens/InputLocationScreen";
import Preferences from "./screens/locationscreens/PreferencesScreen";
import Timing from "./screens/locationscreens/TimingScreen";
import UpdateClique from "./screens/cliquescreens/UpdateCliqueScreen";
import TravelLog from "./screens/travelscreens/TravelLogScreen";
import AddTravel from "./screens/travelscreens/AddTravelScreen";
import GoogleMap from "./screens/locationscreens/GoogleMapScreen";
import OneTime from "./screens/homescreens/OneTimeScreen";
import Notification from "./screens/locationscreens/NotificationScreen";
import Favourite from "./screens/travelscreens/FavouriteScreen";
import AddMember from "./screens/cliquescreens/AddMemberScreen";
import EditMember from "./screens/cliquescreens/EditMemberScreen";

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
      <CliqueStack.Screen name="CliqueScreen2" component={AddMember} />
      <CliqueStack.Screen name="CliqueScreen3" component={EditMember} />
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
