import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { DrawerRouter, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Welcome from "./screens/homescreens/WelcomeScreen";
import Login from "./screens/homescreens/LoginScreen";
import CreateAccount from "./screens/homescreens/CreateAccScreen";
import Home from "./screens/homescreens/HomeScreen";
import SelectPerson from "./screens/locationscreens/SelectPersonScreen2";
import InputLocation from "./screens/locationscreens/InputLocationScreen";
import Timing from "./screens/locationscreens/TimingScreen";
import UpdateClique from "./screens/cliquescreens/UpdateCliqueScreen";
import TravelLog from "./screens/travelscreens/TravelLogScreen";
import AddTravel from "./screens/travelscreens/AddTravelScreen";
import GoogleMap from "./screens/locationscreens/GoogleMapScreen";
import Notification from "./screens/locationscreens/NotificationScreen";
import Favourite from "./screens/travelscreens/FavouriteScreen";
import AddMember from "./screens/cliquescreens/AddMemberScreen";
import EditMember from "./screens/cliquescreens/EditMemberScreen";
import EditMemberLocation from "./screens/cliquescreens/EditMemberLocationScreen";
import AddLocation from "./screens/cliquescreens/AddLocationScreen";
import HomeScreen from "./screens/homescreens/HomeScreen";
import WelcomeScreen from "./screens/homescreens/WelcomeScreen";
import AccountScreen from "./screens/accountscreens/AccountScreen";
import ResetPasswordScreen from "./screens/homescreens/ResetPasswordScreen";
import PaxScreen from "./screens/onetimescreens/PaxScreen";
import OneInputLocation from "./screens/onetimescreens/InputLocationScreen";
import OneGoogleMap from "./screens/onetimescreens/GoogleMapScreen";
import OneNotification from "./screens/onetimescreens/NotificationScreen";
import ChangePassword from "./screens/accountscreens/ChangePassword";
import ChangeEmail from "./screens/accountscreens/ChangeEmail";
import DeleteClique from "./screens/accountscreens/DeleteClique";
import TimeRoute from "./screens/locationscreens/TimeRouteScreen";
import Filter from "./screens/locationscreens/FilterScreen";
import AppIntroSlider from "react-native-app-intro-slider";

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const LocationStack = createStackNavigator();
const CliqueStack = createStackNavigator();
const TravelStack = createStackNavigator();
const OneTimeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

const OneTimeStackScreen = () => {
  return (
    <OneTimeStack.Navigator
      initialRouteName="PaxScreen"
      screenOptions={{ headerShown: false }}
    >
      <OneTimeStack.Screen name="PaxScreen" component={PaxScreen} />
      <OneTimeStack.Screen name="InputLocation" component={OneInputLocation} />
      <OneTimeStack.Screen name="Timing" component={Timing} />
      <OneTimeStack.Screen name="GoogleMap" component={OneGoogleMap} />
      <OneTimeStack.Screen name="Notification" component={OneNotification} />
      <LocationStack.Screen name="Filter" component={Filter} />
      <LocationStack.Screen name="TimeRoute" component={TimeRoute} />
    </OneTimeStack.Navigator>
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
      <CliqueStack.Screen name="CliqueScreen4" component={AddLocation} />
      <CliqueStack.Screen name="CliqueScreen5" component={EditMemberLocation} />
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
      <LocationStack.Screen name="Timing" component={Timing} />
      <LocationStack.Screen name="GoogleMap" component={GoogleMap} />
      <LocationStack.Screen name="Filter" component={Filter} />
      <LocationStack.Screen name="TimeRoute" component={TimeRoute} />
      <LocationStack.Screen name="Notification" component={Notification} />
    </LocationStack.Navigator>
  );
};

const AccountStackScreen = () => {
  return (
    <AccountStack.Navigator
      initialRouteName="Account"
      screenOptions={{ headerShown: false }}
    >
      <AccountStack.Screen name="Account" component={AccountScreen} />
      <AccountStack.Screen name="ChangePassword" component={ChangePassword} />
      <AccountStack.Screen name="ChangeEmail" component={ChangeEmail} />
      <AccountStack.Screen name="DeleteClique" component={DeleteClique} />
    </AccountStack.Navigator>
  );
};

const HomeStackScreen = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      edgeWidth="0"
      drawerStyle={{ backgroundColor: "#d1f6eb", width: 200 }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Account" component={AccountStackScreen} />
      <Drawer.Screen name="Logout" component={WelcomeScreen} />
    </Drawer.Navigator>
  );
};

// export default function App() {
//   return (
//     <NavigationContainer>
//       <AuthStack.Navigator
//         initialRouteName="Welcome"
//         screenOptions={{ headerShown: false }}
//       >
//         <AuthStack.Screen name="Welcome" component={Welcome} />
//         <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
//         <AuthStack.Screen name="OneTime" component={OneTimeStackScreen} />
//         <AuthStack.Screen name="Login" component={Login} />
//         <AuthStack.Screen name="Home" component={HomeStackScreen} />
//         <AuthStack.Screen name="Location" component={LocationStackScreen} />
//         <AuthStack.Screen name="Clique" component={CliqueStackScreen} />
//         <AuthStack.Screen name="Travel" component={TravelStackScreen} />
//         <AuthStack.Screen
//           name="ResetPassword"
//           component={ResetPasswordScreen}
//         />
//       </AuthStack.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: "center",
    width: "90%",
    paddingTop: 30,
  },
  image: {
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 30,
    fontFamily: "Avenir",
    textAlign: "center",
    width: "90%",
  },
  buttonCircle: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const slides = [
  {
    key: "one",
    title: "goWhere",
    text: "Select the optimal location for your outings!",
    image: require("./assets/pacman.png"),
    backgroundColor: "#59b2ab",
  },
  {
    key: "two",
    title: "Clique System",
    text: "Create an account for you and your friends.",
    // image: require("./assets/2.jpg"),
    image: require("./assets/group.png"),
    backgroundColor: "#febe29",
  },
  {
    key: "three",
    title: "Add friends to your clique.",
    image: require("./assets/add-friend.png"),
    text: "Add names of your members to the clique.",
    backgroundColor: "#22bcb5",
  },
  {
    key: "four",
    title: "Add your friends' default locations.",
    image: require("./assets/location.png"),
    text: "Select these default locations (e.g. Home) while choosing meetup location.",
    backgroundColor: "#22bcb5",
  },
  {
    key: "five",
    title: "Keep your travel log updated.",
    image: require("./assets/add-location.png"),
    text: "Add locations to places you have been to refine our algorithm.",
    backgroundColor: "#22bcb5",
  },
  {
    key: "six",
    title: "Let our algorithm do the work.",
    image: require("./assets/map.png"),
    text: "Our algorithm filters out the top 3 locations for your outing!",
    backgroundColor: "#22bcb5",
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#bff6eb",
        }}
      >
        <Image style={styles.image} source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text
          style={{
            fontSize: 18,
            color: "#148972",
            fontFamily: "Avenir",
            paddingRight: 20,
            paddingTop: 10,
          }}
        >
          Next
        </Text>
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text
          style={{
            fontSize: 18,
            color: "#148972",
            fontFamily: "Avenir",
            paddingRight: 20,
            paddingTop: 10,
          }}
        >
          Done
        </Text>
      </View>
    );
  };

  render() {
    if (this.state.showRealApp) {
      return (
        <NavigationContainer>
          <AuthStack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <AuthStack.Screen name="Welcome" component={Welcome} />
            <AuthStack.Screen name="CreateAccount" component={CreateAccount} />
            <AuthStack.Screen name="OneTime" component={OneTimeStackScreen} />
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Home" component={HomeStackScreen} />
            <AuthStack.Screen name="Location" component={LocationStackScreen} />
            <AuthStack.Screen name="Clique" component={CliqueStackScreen} />
            <AuthStack.Screen name="Travel" component={TravelStackScreen} />
            <AuthStack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
            />
          </AuthStack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <AppIntroSlider
          activeDotStyle={{ width: 20, backgroundColor: "#148972" }}
          dotStyle={{ width: 20, backgroundColor: "#c8c8c8" }}
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
        />
      );
    }
  }
}
