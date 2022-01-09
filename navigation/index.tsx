/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/SignInScreen";
import TabTwoScreen from "../screens/AppointmentsScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import AppointmentsScreen from "../screens/AppointmentsScreen";
import OffersScreen from "../screens/OffersScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AssemblingFurnitureScreen from "../screens/AssemblingFurnitureScreen";
import MovingScreen from "../screens/MovingScreen";
import PickLocationScreen from "../screens/PickLocationScreen";
import { Auth } from "aws-amplify";
import { useState } from "react";
import SignIn from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [user, setUser] = useState<any>(undefined);
  Auth.currentAuthenticatedUser()
    .then((data) => {
      setUser(data);
      console.log("data", data);
    })
    .catch((error) => {
      setUser(undefined);
      console.log("error", error);
    });
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Group>
            <Stack.Screen
              name="AssemblingFurniture"
              options={() => ({
                headerShown: true,
                title: "Assembling Furniture",
              })}
              component={AssemblingFurnitureScreen}
            />

            <Stack.Screen
              name="PickLocation"
              options={() => ({
                headerShown: false,
                // title: "Pick your locaiton",
              })}
              component={PickLocationScreen}
            />
            <Stack.Screen
              name="Moving"
              options={() => ({
                headerShown: true,
                title: "Moving in/out",

                // title: "Enter your Bid",
                // headerBackTitle: "Inventory",
              })}
              component={MovingScreen}
            />
          </Stack.Group>
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: "SignIn", headerShown: false }}
          />
          <Stack.Group
          //  screenOptions={{ presentation: "" }}
          >
            {/* <Stack.Screen name="SignIn" component={ModalScreen} /> */}
            <Stack.Screen
              options={{ headerShown: false }}
              name="SignUp"
              component={SignUp}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Ionicons
                name="person-circle"
                size={35}
                color="#055C9D"
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Appointments"
        component={AppointmentsScreen}
        options={{
          title: "Appointments",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-calendar" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          title: "Offers",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="local-offer" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={TabTwoScreen}
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
