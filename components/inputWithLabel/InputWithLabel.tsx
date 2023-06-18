import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

type InputWithLabelType = {
  value: string;
  labelName: string;
  placeholder?: string;
  handleChange: (text: string) => void;
  secure?: boolean;
};

const InputWithLabel = (props: InputWithLabelType) => {
  const {
    value,
    handleChange,
    labelName,
    placeholder = "",
    secure = false,
  } = props;
  return (
    <View>
      <Text style={styles.label}>{labelName}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        value={value}
        onChangeText={(text) => handleChange(text)}
        secureTextEntry={secure}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: "#BCCDDC",
    marginTop: 10,
    width: "100%",
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    color: "#32325D",
    marginBottom: -5,
  },
});
export default InputWithLabel;
