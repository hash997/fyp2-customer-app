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
  useRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Alert, ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import JobRequestsScreen from "../screens/JobRequestsScreen";
import OffersScreen from "../screens/OffersScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationScreen from "../screens/NotificationScreen";
import AssemblingFurnitureScreen from "../screens/AssemblingFurnitureScreen";
import MovingScreen from "../screens/MovingScreen";
import PickLocationScreen from "../screens/PickLocationScreen";
import SignIn from "../screens/SignInScreen";
import SignUp from "../screens/SignUpScreen";
import { useEffect, useState } from "react";
import JobConfirmationScreen from "../screens/JobConfirmationScreen";
import PickWorkerScreen from "../screens/PickWorkerScreen";
import { useAuth } from "../state-store/auth-state";
import { API } from "aws-amplify";
import {
  onJobToWorkerUpdated,
  onOfferCreated,
} from "../src/graphql/subscriptions";
import {
  ActionType,
  useDispatchOffer,
  useOffer,
} from "../state-store/offers-provider";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const { user } = useAuth();
  const currentOffers = useOffer();
  const dispatchCurrentOffers = useDispatchOffer();
  const [showAlert, setShowAlert] = useState({
    newOffer: false,
    jobAccepted: false,
  });

  const createTwoButtonAlert = (title: string, description: string) =>
    Alert.alert(title, description, [
      {
        text: "Cancel",
        onPress: () => setShowAlert({ newOffer: false, jobAccepted: false }),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => setShowAlert({ newOffer: false, jobAccepted: false }),
      },
    ]);

  useEffect(() => {
    if (!user) return;
    const onOfferCreatedSub = API.graphql(
      // @ts-ignore
      {
        query: onOfferCreated,
        variables: {
          customerId: user.id,
        },
      }
      // @ts-ignore
    ).subscribe({
      // @ts-ignore
      next: ({ _, value }) => {
        setShowAlert({ newOffer: true, jobAccepted: false });

        dispatchCurrentOffers({
          type: ActionType.ADD_TO_NEW_OFFER,
          payload: {
            ...currentOffers,
            offers: [...currentOffers.offers, value.data.onOfferCreated],
          },
        });
      },

      //@ts-ignore
      error: (error) => {
        console.warn(error);
      },
    });

    const onJobToWorkerUpdatedSub = API.graphql(
      // @ts-ignore
      {
        query: onJobToWorkerUpdated,
        variables: {
          customerId: user.id,
        },
      }
      // @ts-ignore
    ).subscribe({
      // @ts-ignore
      next: ({ _, value }) => {
        console.log("updated job", value);

        setShowAlert({ newOffer: false, jobAccepted: true });
      },
      //@ts-ignore
      error: (error) => {
        console.warn(error);
      },
    });

    return () => {
      onOfferCreatedSub.unsubscribe();
      onJobToWorkerUpdatedSub.unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    console.log("current offers", currentOffers);
  }, [currentOffers]);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {showAlert.newOffer &&
        createTwoButtonAlert(
          "You have new offer!",
          "See your offer in the offers tab"
        )}
      {showAlert.jobAccepted &&
        createTwoButtonAlert(
          "Someone has accepted your job request!",
          "See your job request in the job requests tab"
        )}
      {user ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Group>
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
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
            headerShown: true,
            title: "Pick your location",
          })}
          component={PickLocationScreen}
        />
        <Stack.Screen
          name="PickWorker"
          options={() => ({
            headerShown: true,
            title: "Pick Worker",
          })}
          component={PickWorkerScreen}
        />
        <Stack.Screen
          name="JobConfirmation"
          options={() => ({
            headerShown: true,
            title: "Confirmation",
          })}
          component={JobConfirmationScreen}
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
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate("Modal")}
          //     style={({ pressed }) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}
          //   >
          //     <Ionicons
          //       name="person-circle"
          //       size={35}
          //       color="#055C9D"
          //       style={{ marginRight: 15 }}
          //     />
          //   </Pressable>
          // ),
        })}
      />
      <BottomTab.Screen
        name="JobRequests"
        component={JobRequestsScreen}
        options={{
          title: "Job Requests",
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
        component={NotificationScreen}
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

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: "SignIn", headerShown: false }}
      />
      <Stack.Group
      //  screenOptions={{ presentation: "" }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
