import { ImageBackground, StyleSheet } from "react-native";
import { View } from "./Themed";

export type CameraPreviewProps = {
  photo: any;
};

const CameraPreview = (props: CameraPreviewProps) => {
  const { photo } = props;
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.imageBackground}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    height: "100%",
    borderWidth: 10,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center",
  }
});
export default CameraPreview;
