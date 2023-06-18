import Button from "../components/Button";
import {
  StyleSheet,
  View,
  StatusBar as NativeStatusBar,
  Platform,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import WelcomeScreenStar from "../components/transformedSvgs/WelcomeScreenStar";
import StaidLogoHeader from "../components/StaidLogoHeader";

const WelcomeScreen = ({ navigation }: any) => {
  // TODO: Move styles into StyleSheet object (separate file to have them available in other components)
  return (
    <>
      <View style={styles.background}>
        <StaidLogoHeader />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <WelcomeScreenStar />
          <Text
            style={{
              letterSpacing: 5,
              color: "#32325D",
              fontSize: 15,
              fontWeight: "700",
              marginTop: 10,
            }}
          >
            IT'S TIME TO
          </Text>
          <Text
            style={{
              color: "#32325D",
              fontSize: 43,
              fontWeight: "700",
            }}
          >
            Learn Faster
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                color: "#32325D",
                lineHeight: 22,
                fontSize: 16,
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              Use your 📸 to generate{" "}
              <Text style={{ fontWeight: "bold" }}>Smart Documents</Text> and
              <Text style={{ fontWeight: "bold" }}> Questionnaires</Text> to
              help you improve your performance.
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text={"Sign In"}
            customButtonStyle={styles.signInButtonStyle}
            customTextStyle={styles.signInTextStyle}
            onPress={() => console.log(navigation.navigate("sign-in"))}
          />

          <Button
            text={"Sign Up"}
            customButtonStyle={styles.signUpButtonStyle}
            customTextStyle={styles.signUpTextStyle}
            onPress={() => navigation.navigate("sign-up")}
          />
        </View>
        <StatusBar style="dark" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: Platform.OS == "android" ? NativeStatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
  },
  catchphrase: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButtonStyle: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "#6760FF",
  },
  signInTextStyle: { fontWeight: "700", fontSize: 15 },
  signUpButtonStyle: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#6760FF",
    backgroundColor: "white",
  },
  signUpTextStyle: { color: "black", fontWeight: "700", fontSize: 15 },
});

export default WelcomeScreen;
