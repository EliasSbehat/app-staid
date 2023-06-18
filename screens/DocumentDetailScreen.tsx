import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DocumentsHeader from "../components/DocumentsHeader";
import SubDocumentList from "../components/SubDocumentList";
import { collection, orderBy, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { auth } from "../config/firebase";

export default function DocumentListScreen({ navigation, route }: any) {
  const {
    id: documentId,
    title: documentTitle,
    content: documentContent,
  } = route.params.params;

  const subDocumentsCollection = collection(
    useFirestore(),
    "users",
    auth?.currentUser?.uid || "",
    "documents",
    documentId,
    "subDocuments"
  );

  const subDocumentsQuery = query(
    subDocumentsCollection,
    orderBy("sortOrder", "asc")
  );

  const { status, data: subDocumentsData } =
    useFirestoreCollectionData(subDocumentsQuery);

    console.log("SDD", subDocumentsData);

  return (
    <SafeAreaView style={styles.container}>
      <DocumentsHeader
        title={documentTitle}
        description={documentContent}
        linkText="Show original prompt"
        handleBackButtonPress={() => navigation.goBack()}
      />
      {status === "loading" ? (
        <Text>Loading...</Text>
      ) : (
        <SubDocumentList
          subDocumentsData={subDocumentsData}
          redirectTo={(params: any) => {
            navigation.navigate("SubDocumentDetailScreen", {
              subDocumentData: params,
              documentData: {
                id: documentId,
                title: documentTitle,
              },
            });
          }}
        />
      )}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FE",
  },
  content: {
    marginTop: 20,
  },
});
