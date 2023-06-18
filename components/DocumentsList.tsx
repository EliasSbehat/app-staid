import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  collection,
  query,
  onSnapshot,
  limit,
  orderBy,
  getDocs,
  startAfter,
} from "firebase/firestore";
import DocumentListItem from "./DocumentListItem";

import Colors from "../constants/Colors";

export default function DocumentsList(props: any) {
  const { redirectTo } = props;
  const [docs, setDocs] = useState<any>([]);
  const [lastDoc, setLastDoc] = useState<any>();
  const [endPagination, setEndPagination] = useState<boolean>(false);

  // console.log(auth.currentUser?.uid);

  useEffect(() => {
    const getFirstBatch = async () => {
      // Construct query for first 10 documents, ordered by creation date
      // Query the first page of docs
      const first = query(
        collection(db, "users", auth?.currentUser?.uid || "", "documents"),
        orderBy("createdAt", "desc"),
        limit(20)
      );
      const documentSnapshots = await getDocs(first);
      const newData: any = [];
      documentSnapshots.forEach((doc) => {
        newData.push({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          date: doc.data().createdAt,
        });
      });
      setDocs([...newData]);
      // Get the last visible document
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // console.log("last", lastVisible);

      setLastDoc(lastVisible);
    };
    getFirstBatch();
  }, []);

  // Construct a new query starting at this document,
  // get the next 10 documents, starting from the last one.
  const getMoreDocs = async () => {
    const next = query(
      collection(db, "users", auth?.currentUser?.uid || "", "documents"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(20)
    );
    const documentSnapshots = await getDocs(next);
    const newData: any = [];
    documentSnapshots.forEach((doc) => {
      newData.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        date: doc.data().createdAt,
      });
    });
    setDocs([...docs, ...newData]);

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    // console.log("last", lastVisible);

    setLastDoc(lastVisible);

    documentSnapshots.docs.length == 0
      ? setEndPagination(true)
      : setEndPagination(false);
  };
  console.log(docs);

  return (
    <View style={styles.container}>
      <FlatList
        data={docs}
        onEndReached={() => {
          !endPagination && getMoreDocs();
        }}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        ListFooterComponent={() => {
          if (!endPagination) {
            return <ActivityIndicator color={Colors.dark.primary} />;
          }
          return <View></View>;
        }}
        renderItem={({ item }) => (
          <DocumentListItem
            key={item.id}
            item={item}
            handlePress={redirectTo}
          />
        )}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 150,
  },
});
