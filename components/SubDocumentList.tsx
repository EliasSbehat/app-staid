import { StyleSheet, View, FlatList } from "react-native";
import SubDocumentListItem from "./SubDocumentListItem";

export default function SubDocumentList({
  redirectTo,
  subDocumentsData,
}: {
  redirectTo: any;
  subDocumentsData: any;
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={subDocumentsData}
        renderItem={({ item }) => (
          <SubDocumentListItem
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
