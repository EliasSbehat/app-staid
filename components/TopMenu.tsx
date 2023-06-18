import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function TopMenu({
  title,
  handleRightButtonPress,
  handleLeftButtonPress,
  dark = false
}: {
  title: string;
  handleRightButtonPress?: any;
  handleLeftButtonPress?: any;
  dark?: boolean;
}) {
  return (
    <View style={styles.TopMenu}>
      {/* TODO: recieve left and right button props */}
      <View style={styles.column}>
        {handleLeftButtonPress && (
          <Button
            text="Logout"
            type="transparent"
            // icon={"user"}
            onPress={handleLeftButtonPress}
          />
        )}
      </View>
      <View style={styles.mainColumn}>
        <Text style={[styles.title, dark ? styles.dark : null]}>{title}</Text>
      </View>
      <View style={styles.column}>
        {handleRightButtonPress && (
          <Button
            type="primary"
            text="Docs"
            icon={"file-alt"}
            onPress={handleRightButtonPress}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  TopMenu: {
    // flex: 1,
    // width: "100%",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    // borderWidth: 1,
    height: 40,
  },
  mainColumn: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  column: {
    width: 100,
  },
  title: {
    fontSize: 20,
    color: "white",
    // backgroundColor: "red",
    fontWeight: "bold",
    textAlign: "center",
    // height: 30,
  },
  dark: {
    color: Colors.dark.tintColor,
  }
});
