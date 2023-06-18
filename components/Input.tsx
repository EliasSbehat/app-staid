import { StyleSheet, Text, View, TextInput } from "react-native";
import Colors from "../constants/Colors";

export default function Input({
  label,
  description,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline = false,
  grow = false,
}: {
  label?: string;
  description?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  grow?: boolean;
}) {
  return (
    <View style={[styles.container, grow ? styles.grow : {}]}>
      {label && <Text style={styles.label}>{label}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      <View style={[styles.inputContainer, grow ? styles.grow : {}]}>
        <TextInput
          style={[styles.input, grow ? styles.grow : {}]}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          placeholderTextColor={Colors.dark.lightTintColor}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    marginBottom: 20,
    flex: 0,
    // flexGrow: 1,
    height: 100,
  },
  grow: {
    // flex: 1,
    // height: "100%",
    flexGrow: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.dark.lightTintColor,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    flexShrink: 1,
    // flex: 0,
  },
  input: {
    // borderWidth: 1,
    fontSize: 16,
    color: Colors.dark.tintColor,
    // flex: 1,
  },
  label: {
    color: Colors.dark.tintColor,
    fontSize: 18,
    marginBottom: 1,
    // fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: Colors.dark.lightTintColor,
    marginBottom: 10,
  },
});
