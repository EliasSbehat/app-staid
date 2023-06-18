import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StaidLogo from "./transformedSvgs/StaidLogo";
import StaidTextSvg from "./transformedSvgs/StaidTextSvg";

const StaidLogoHeader = () => {
  return (
    <View style={styles.logoContainer}>
      <StaidLogo />
      <StaidTextSvg style={{ marginTop: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
});
export default StaidLogoHeader;
