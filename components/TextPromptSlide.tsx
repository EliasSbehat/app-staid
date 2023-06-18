import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "./Button";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import Colors from "../constants/Colors";

export default function TextPromptSlide({ navigateTo }: any) {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.TextPromptSlide}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={text}
        placeholder="Type your prompt here..."
        multiline
      />
      <Button
        onPress={() => navigateTo("ConfirmationScreen", text)}
        text="Create Document"
        iconAlignment="right"
        disabled={text.length <= 5}
        icon={"chevron-right"}
        size="lg"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  TextPromptSlide: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  textInput: {
    flex: 1,
    // borderColor: 'gray',
    // borderWidth: 1,
    color: Colors.dark.tintColor,
    fontSize: 20,
  }
});
