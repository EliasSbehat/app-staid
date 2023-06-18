import { StyleSheet, Text, View, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export default function SubDocumentListItem({
  item,
  handlePress,
}: {
  item: any;
  handlePress: any;
}) {
  const {
    status,
    displayParameters: { icon, name, description },
  } = item;

  return (
    <Pressable
      style={[
        styles.container,
        status === "pending" ? styles.loadingContainer : {},
      ]}
      onPress={() => {
        if (status === "fulfilled") handlePress(item);
      }}
    >
      <View style={styles.iconContainer}>
        <FontAwesome5 name={icon} style={styles.icon} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <SubDocumentStatus status={status} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 4,
    alignContent: "flex-start",
    shadowColor: "#c0bfbf",
    minHeight: 110,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  loadingContainer: {
    opacity: 0.3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    // backgroundColor: "red",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
    color: Colors.dark.primary,
  },
  content: {
    flexShrink: 1,
  },
  title: {
    fontSize: 18,
    flexShrink: 1,
    fontWeight: "600",
    color: Colors.dark.tintColor,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontWeight: "normal",
    color: Colors.dark.tintColor,
  },
});

const SubDocumentStatus = ({ status }: { status: string }) => {
  switch (status) {
    case "pending":
      return (
        <View style={[statusStyles.statusContainer, { backgroundColor: Colors.dark.warningLight }]}>
          <Text style={[statusStyles.statusText, { color: Colors.dark.warning }]}>
            PENDING
          </Text>
        </View>
      );
    case "processing":
      return (
        <View style={[statusStyles.statusContainer, { backgroundColor: Colors.dark.okayLight }]}>
          <Text style={[statusStyles.statusText, { color: Colors.dark.okay }]}>
            PROCESSING
          </Text>
        </View>
      );
    case "error":
      return (
        <View style={[statusStyles.statusContainer, { backgroundColor: Colors.dark.okayLight }]}>
          <Text style={[statusStyles.statusText, { color: Colors.dark.okay }]}>
            ERROR
          </Text>
        </View>
      );
    default:
      return null;
  }
};

const statusStyles = StyleSheet.create({
  statusContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    marginLeft: "auto",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
});