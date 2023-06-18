import React from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { addTextPromptDoc } from "../hooks/useFirebaseHooks";
import TopMenu from "../components/TopMenu";
import Input from "../components/Input";
import Colors from "../constants/Colors";
import Button from "../components/Button";
import { StatusBar } from "expo-status-bar";

const ConfirmationScreen = ({ navigation, route }: any) => {
  const text = route.params.params;

  const [titleValue, setTitleValue] = useState("");
  const [contentValue, setContentValue] = useState(text);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        <TopMenu title="New Document" dark />
        <View style={styles.formContainer}>
          <Input
            label="Title"
            description="Give your document a title"
            value={titleValue}
            onChangeText={(title) => setTitleValue(title)}
            placeholder="My Awesome Document"
          />
          <Input
            label="Content"
            description="Make any necessary changes to the content"
            value={contentValue}
            onChangeText={(content) => setContentValue(content)}
            placeholder="Title"
            grow
            multiline
          />
        </View>
        <View style={styles.bottomOptions}>
          <Button
            onPress={navigation.popToTop}
            text={"Cancel"}
            type="transparent"
            customTextStyle={{color: Colors.dark.tintColor}}
            size="lg"
          />
          <Button
            onPress={() =>
              addTextPromptDoc(titleValue, contentValue, () =>
                navigation.navigate("DocumentListScreen")
              )
            }
            text={"Create Document"}
            disabled={titleValue.length <= 5}
            size="lg"
            icon="chevron-right"
            iconAlignment="right"
          />
        </View>
      </KeyboardAvoidingView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.altBackground,
    justifyContent: "space-between",
    alignItems: "stretch",
    // alignItems: "center",
    // justifyContent: "center",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    alignItems: "stretch",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  bottomOptions: {
    // borderWidth: 1,
    // borderColor: "red",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
});
export default ConfirmationScreen;
