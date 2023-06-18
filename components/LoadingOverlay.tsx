import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

export default function LoadingOverlay({
  loading = false,
  text,
}: {
  loading: boolean;
  text?: string;
}) {
  return (
    <View style={[styles.container, !loading ? styles.hidden : null]}>
      <View style={styles.spinner}>
        <ActivityIndicator size={"large"} color={Colors.dark.primary} />
      </View>
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    margin: 10,
  },
  hidden: {
    display: "none",
  },
  text: {
    color: "white",
  },
});
