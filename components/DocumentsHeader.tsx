import { StyleSheet, Text, View, TextInput } from "react-native";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Colors from "../constants/Colors";

export default function DocumentsHeader({
  title,
  description,
  linkText,
  handleLinkClick,
  showSearchBar,
  handleSearchBarChange,
  handleBackButtonPress,
  shadow = true,
}: {
  title?: string;
  description?: string;
  linkText?: string;
  handleLinkClick?: any;
  showSearchBar?: boolean;
  handleSearchBarChange?: any;
  handleBackButtonPress?: any;
  shadow?: boolean;
}) {
  return (
    <View style={[styles.container, shadow ? styles.shadowStyle : {}]}>
      <View style={styles.whiteOverlay} />
      <View style={styles.top}>
        <View style={styles.backButton} onTouchEnd={handleBackButtonPress}>
          <ChevronLeftIcon color={"#32325D"} size={30} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {description && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )}
          {linkText && (
            <Text style={styles.seeOriginal} onPress={handleLinkClick}>
              {linkText}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.bottom}>
        {showSearchBar && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchTextInput}
              // onChangeText={onChangeNumber}
              // value={number}
              placeholder="What are you looking for?"
              placeholderTextColor={Colors.dark.primary}
              keyboardType="default"
            />
            <MagnifyingGlassIcon
              style={styles.searchIcon}
              color={Colors.dark.primary}
              size={20}
            />
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    // paddingTop: 0,
    paddingBottom: 10,
    // borderColor: "green",
    // borderWidth: 1,
  },
  shadowStyle: {
    shadowColor: "#c0bfbf",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  whiteOverlay: {
    position: "absolute",
    top: -50,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  top: {
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    // backgroundColor: "red",
  },
  bottom: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  backButtonIcon: {
    color: "white",
  },
  backButton: {
    height: 50,
    // backgroundColor: "green",
    padding: 0,
    width: 50,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  content: {
    flex: 1,
    padding: 10,
    paddingTop: 15,
    // backgroundColor: "red",
    justifyContent: "center",
  },
  title: {
    color: Colors.dark.tintColor,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: Colors.dark.tintColor,
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 10,
  },
  seeOriginal: {
    color: Colors.dark.primary,
    fontSize: 16,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "white",
    borderColor: Colors.dark.primary,
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 40,
    justifyContent: "center",
  },
  searchTextInput: {
    fontSize: 16,
    color: Colors.dark.tintColor,
    // backgroundColor: "red",
    padding: 14,
    paddingHorizontal: 0,
    // borderColor: "green",
  },
  searchIcon: {
    position: "absolute",
    right: 20,
  },
});
