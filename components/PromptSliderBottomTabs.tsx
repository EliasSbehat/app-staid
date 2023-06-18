import {
  StyleSheet,
  Text,
  View,
  Animated,
  useWindowDimensions,
  Pressable,
} from "react-native";
import {
  ClipboardDocumentIcon,
  MicrophoneIcon,
  CameraIcon,
} from "react-native-heroicons/outline";

import Colors from "../constants/Colors";

export default function PromptSliderBottomTabs({
  scrollX,
  scrollTo,
  currentIndex,
  handleTakePicture,
}: {
  scrollX: any;
  scrollTo: any;
  currentIndex: number;
  handleTakePicture: () => void;
}) {
  const { width } = useWindowDimensions();
  const highlightWidth = width / 3;

  const handleCameraIconPress = () => {
    if (currentIndex === 1) {
      handleTakePicture()
    } else {
      scrollTo(width);
    }
  };

  const highlightPositionX = scrollX.interpolate({
    inputRange: [0, width * 2],
    outputRange: [0, highlightWidth * 2],
    extrapolate: "clamp",
  });
  const highlightOpacity = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });
  const cameraIconTopOffset = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: [0, -20, 0],
    extrapolate: "clamp",
  });
  const takePictureButtonOpacity = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: [0, 1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Pressable style={styles.iconTouchable} onPress={() => scrollTo(0)}>
          <ClipboardDocumentIcon color={"white"} />
        </Pressable>
      </View>

      <Animated.View
        style={[
          styles.icon,
          styles.CameraIcon,
          {
            transform: [{ translateY: cameraIconTopOffset }],
          },
        ]}
      >
        <Pressable style={styles.iconTouchable} onPress={handleCameraIconPress}>
          <CameraIcon color={"white"} />
          <Animated.View
            style={[
              styles.takePictureButton,
              { opacity: takePictureButtonOpacity },
            ]}
          >
            <CameraIcon color={Colors.light.primary} />
          </Animated.View>
        </Pressable>
      </Animated.View>

      <View style={styles.icon}>
        <Pressable
          style={styles.iconTouchable}
          onPress={() => scrollTo(width * 2)}
        >
          <MicrophoneIcon color={"white"} />
        </Pressable>
      </View>

      <Animated.View
        style={[
          styles.highlightContainer,
          {
            width: highlightWidth,
            transform: [{ translateX: highlightPositionX }],
            // left: highlightPositionX,
            opacity: highlightOpacity,
          },
        ]}
      >
        <View style={[styles.highlight]} />
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-around",
    flexDirection: "row",
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  iconTouchable: {
    // flex: 1,
    // borderColor: "red",
    // borderWidth: 1,
    // backgroundColor: 'blue',
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "transparent",
    width: 100,
    // borderRadius: 100,
    // borderWidth: 7,
  },
  CameraIcon: {
    borderColor: Colors.dark.primary,
  },
  highlightContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "green",
  },
  highlight: {
    backgroundColor: "white",
    height: 6,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    width: "40%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  takePictureButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "90%",
    height: "90%",
    margin: "5%",
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 7,
    borderColor: Colors.light.primary,
    opacity: 0,
  },
});
