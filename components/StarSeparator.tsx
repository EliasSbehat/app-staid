import React from "react";
import { View } from "react-native";
import WelcomeScreenStar from "./transformedSvgs/WelcomeScreenStar";

const StarSeparator = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "#C4D4E0",
          position: "absolute",
        }}
      />
      <View style={{ padding: 10, backgroundColor: "white" }}>
        <WelcomeScreenStar />
      </View>
    </View>
  );
};

export default StarSeparator;
