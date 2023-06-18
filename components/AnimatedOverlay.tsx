import { StyleSheet, Animated, useWindowDimensions } from "react-native";
import Colors from "../constants/Colors";

export default function AnimatedOverlay({ scrollX }: { scrollX: any }) {
  const { width } = useWindowDimensions();

  const overlayOpacity = scrollX.interpolate({
    inputRange: [0, width, width * 2],
    outputRange: [.3, 0, .3],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: overlayOpacity,
        },
      ]}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: 0,
    backgroundColor: Colors.dark.primary,
    opacity: 0.4,
  },
});
