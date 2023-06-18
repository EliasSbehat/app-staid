import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DocumentsHeader from "../components/DocumentsHeader";
import TextRenderer from "../components/TextRenderer";

export default function SubDocumentDetailScreen({ navigation, route }: any) {
  const params = route.params;

  const {
    content,
    displayParameters: { name, description, icon },
    renderType,
  } = params.subDocumentData;

  const documentTitle = params.documentData.title;

  const Header = (
    <DocumentsHeader
      // title={name}
      // description={description}
      // linkText="Show original prompt"
      handleBackButtonPress={() => navigation.goBack()}
    />
  );

  if (renderType === "text") {
    return (
      <SafeAreaView style={styles.container}>
        {Header}
        <TextRenderer overline={name} title={documentTitle} content={content} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Please update the app to view this document</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FE",
  },
});
