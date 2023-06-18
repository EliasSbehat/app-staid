import { StyleSheet, Text, View, Pressable } from "react-native";
import Colors from "../constants/Colors";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useEffect } from "react";

TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);

export type DocumentListItemType = {
  item: any;
  handlePress: any;
};

export default function DocumentListItem(props: DocumentListItemType) {
  const { item, handlePress } = props;
  const { id, title = "Placeholder title", content, date } = item;
  const timeAgo = new TimeAgo("en-us");

  const parsedDate = new Date(date.seconds * 1000);

  return (
    <Pressable onPress={() => handlePress(item)}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.date}>{timeAgo.format(parsedDate)}</Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.content} numberOfLines={2}>
            {content}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 4,
    alignContent: "flex-start",
    shadowColor: "#c0bfbf",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    // borderColor: "red",
    // borderWidth: 1,
  },
  title: {
    fontSize: 18,
    flexShrink: 1,
    fontWeight: "600",
    color: Colors.dark.tintColor,
  },
  date: {
    fontSize: 14,
    flexShrink: 0,
    fontWeight: "normal",
    color: Colors.dark.lightTintColor,
  },
  bottom: {
    // marginTop: 10,
  },
  content: {
    fontSize: 14,
    fontWeight: "normal",
    color: Colors.dark.tintColor,
  },
});
