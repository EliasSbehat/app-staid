import { StyleSheet, Text, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Colors from "../constants/Colors";

export default function Button({
  onPress,
  text,
  icon = null,
  iconAlignment = "left",
  disabled = false,
  customButtonStyle = {},
  customTextStyle = {},
  type = "primary",
  size = "sm",
}: {
  onPress: () => void;
  text?: string;
  icon?: JSX.Element | string | null;
  iconAlignment?: "left" | "right";
  disabled?: boolean;
  customButtonStyle?: any;
  customTextStyle?: any;
  type?: "primary" | "secondary" | "transparent";
  size?: "sm" | "md" | "lg";
}) {

  const iconElement =
    typeof icon == "string" ? (
      <FontAwesome5 name={icon} color={"white"} size={16} />
    ) : (
      icon
    );

  return (
    <Pressable
      onPress={disabled ? () => {} : onPress}
      style={[
        styles.button,
        styles[type],
        styles[size],
        customButtonStyle,
        disabled ? styles.disabled : {},
      ]}
    >
      {icon && iconAlignment === "left" && iconElement}
      {text && (
        <Text
          style={[
            styles.text,
            {
              marginLeft: iconAlignment == "left" && icon ? 8 : 0,
              marginRight: iconAlignment == "right" && icon ? 8 : 0,
            },
            customTextStyle,
          ]}
        >
          {text}
        </Text>
      )}
      {icon && iconAlignment === "right" && iconElement}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    // paddingVertical: 7,
  },
  primary: {
    backgroundColor: Colors.dark.primary,
  },
  secondary: {
    backgroundColor: Colors.dark.lightGrey,
  },
  transparent: {
    backgroundColor: "transparent",
  },
  disabled: {
    backgroundColor: Colors.dark.lightGrey,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  sm: {
    paddingHorizontal: 18,
    minHeight: 40,
  },
  md: {
    paddingHorizontal: 22,
    minHeight: 45,
  },
  lg: {
    paddingHorizontal: 25,
    minHeight: 50,
  },
});
