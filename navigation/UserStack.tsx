import React from "react";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { UserStackParamList } from "../types";

import useColorScheme from "../hooks/useColorScheme";

import LinkingConfiguration from "./LinkingConfiguration";
import NotFoundScreen from "../screens/NotFoundScreen";
import ModalScreen from "../screens/ModalScreen";
import PromptCaptureSlider from "../screens/PromptCaptureSlider";
import DocumentListScreen from "../screens/DocumentListScreen";
import { View, Text } from "../components/Themed";
import DocumentDetailScreen from "../screens/DocumentDetailScreen";
import SubDocumentDetailScreen from "../screens/SubDocumentDetailScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import CameraPreviewScreen from "../screens/CameraPreviewScreen";

const Stack = createNativeStackNavigator<UserStackParamList>();
const MainStack = createNativeStackNavigator<UserStackParamList>();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Root"
        component={PromptCaptureSlider}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="DocumentListScreen"
        component={DocumentListScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="DocumentDetailScreen"
        component={DocumentDetailScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="SubDocumentDetailScreen"
        component={SubDocumentDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="CameraPreviewScreen"
        component={CameraPreviewScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="ConfirmationScreen"
        component={ConfirmationScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </MainStack.Navigator>
  );
};

export default function UserStack() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name="Modal"
            component={ModalScreen}
            options={{ headerShown: false, gestureEnabled: false, animation: "fade", navigationBarHidden: true }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}