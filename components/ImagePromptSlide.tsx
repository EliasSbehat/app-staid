import { StyleSheet, Text, View } from "react-native";
import {
  BoltIcon,
  BoltSlashIcon,
  ArrowPathRoundedSquareIcon,
  PhotoIcon,
} from "react-native-heroicons/outline";

import Colors from "../constants/Colors";
import Button from "./Button";

export default function ImagePromptSlide({
  toggleCameraType,
  flashMode,
  toggleFlashMode,
  uploadImage,
}: {
  toggleCameraType: () => void;
  flashMode: any;
  toggleFlashMode: () => void;
  uploadImage: () => void;
}) {
  return (
    <View style={styles.ImagePromptSlide}>
      <View style={styles.cameraControls}>
        <Button
          onPress={toggleFlashMode}
          icon={"bolt"}
          type={flashMode === "torch" ? "primary" : "secondary"}
          customButtonStyle={{
            minWidth: 60,
          }}
        />
        <Button
          type="secondary"
          onPress={toggleCameraType}
          icon={"undo"}
          customButtonStyle={{
            minWidth: 60,
          }}
        />
      </View>
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />
      <View style={styles.cameraControls}>
        <Button
          type="secondary"
          onPress={toggleCameraType}
          icon={"file-pdf"}
          customButtonStyle={{
            minWidth: 60,
          }}
          text="PDF"
        />
        <Button
          onPress={() => uploadImage()}
          icon={"image"}
          text="Gallery"
          type="secondary"
        />
        {/* <Button
          onPress={() => uploadImage()}
          icon={"image"}
          text="Upload image"
          type="secondary"
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ImagePromptSlide: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  // uploadButtons: {
  //   // backgroundColor: 'red',
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   flexDirection: "row",
  // },
  cameraControls: {
    // backgroundColor: 'red',
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: Colors.dark.secondary,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
});
