import { StyleSheet, Text, ScrollView } from "react-native";
import Colors from "../constants/Colors";

export default function TextRenderer({
  content,
  title,
  overline
}: {
  content: string;
  title?: string;
  overline?: string;
}) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.overline}>{overline}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: "#FFFFFF",
  },
  overline: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.dark.tintColor,
    textTransform: "uppercase",
    letterSpacing: 2,
    fontWeight: "600",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.dark.tintColor,
    marginBottom: 30,
  },
  content: {
    fontSize: 20,
    textAlign: "center",
    color: Colors.dark.tintColor,
  },
});
