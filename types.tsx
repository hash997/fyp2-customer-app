/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Landing: undefined;
  AssemblingFurniture: NavigatorScreenParams<RootTabParamList> | undefined;
  JobConfirmation: undefined;
  PickLocation: undefined;
  PickWorker: undefined;
  Moving: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  JobRequests: undefined;
  Offers: undefined;
  Assembly: undefined;
  Notifications: undefined;
  Settings: undefined;
  PickLocation: undefined;
};

export type AssemblingFurniture = {
  PickLocation: undefined;
  JobConfirmation: undefined;
};
export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
