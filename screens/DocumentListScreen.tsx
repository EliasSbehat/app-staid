import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DocumentsHeader from "../components/DocumentsHeader";
import DocumentsList from "../components/DocumentsList";

export default function DocumentListScreen({ navigation }: any) {
  const redirectToDetail = (params: any) => {
    navigation.navigate("DocumentDetailScreen", { params });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
      <DocumentsHeader
        title="Documents"
        handleBackButtonPress={navigation.popToTop}
        showSearchBar
      />
      <DocumentsList redirectTo={redirectToDetail} />
      <StatusBar style="dark" />
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#F8F9FE",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
