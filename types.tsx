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
    interface UserParamList extends UserStackParamList {}
  }
}

export type UserStackParamList = {
  Root: NavigatorScreenParams<UserTabParamList> | undefined;
  Main: undefined;
  DocumentListScreen: undefined;
  DocumentDetailScreen: undefined;
  SubDocumentDetailScreen: undefined;
  ConfirmationScreen: undefined;
  CameraPreviewScreen: undefined;
  Modal: undefined;
  NotFound: undefined;
  Scanner: undefined;
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthStackParamList = {
  // Root: NavigatorScreenParams<UserTabParamList> | undefined;
};

export type UserStackScreenProps<Screen extends keyof UserStackParamList> =
  NativeStackScreenProps<UserStackParamList, Screen>;

export type UserTabParamList = {
  TextPrompt: undefined;
  ImagePrompt: undefined;
  DocumentList: undefined;
};

export type UserTabScreenProps<Screen extends keyof UserTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<UserTabParamList, Screen>,
    NativeStackScreenProps<UserStackParamList>
  >;
