import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import StaidLogoHeader from "../components/StaidLogoHeader";
import Button from "../components/Button";
import InputWithLabel from "../components/inputWithLabel/InputWithLabel";
import StarSeparator from "../components/StarSeparator";
import GoogleIconSvg from "../components/transformedSvgs/GoogleIconSvg";

const SingInScreen = ({ navigation }: any) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error: any) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  const forgotPassword = async () => {
    await sendPasswordResetEmail(auth, value.email)
      .then(() => console.log("Reset password email sent"))
      .catch((error) => console.log("error", error));
  };
  return (
    <View style={styles.container}>
      <StaidLogoHeader />

      {!!value.error && (
        <View style={styles.error}>
          <Text>{value.error}</Text>
        </View>
      )}

      <View style={styles.inputsContainer}>
        <InputWithLabel
          placeholder="staid@exampple.com"
          labelName="Email"
          value={value.email}
          handleChange={(text) => setValue({ ...value, email: text })}
        />
        <InputWithLabel
          placeholder=""
          labelName="Password"
          value={value.password}
          handleChange={(text) => setValue({ ...value, password: text })}
          secure={true}
        />

        {/* Sign in button */}
        <Button
          text={"Sign In"}
          customButtonStyle={{
            width: "100%",
            height: 50,
            borderRadius: 5,
            justifyContent: "center",
            marginVertical: 10,
            backgroundColor: "#6760FF",
          }}
          customTextStyle={{ fontWeight: "700", fontSize: 15 }}
          onPress={() => signIn()}
        />

        {/* Forgot password text */}
        <Text
          style={{ color: "#6760FF", textAlign: "center", fontSize: 16 }}
          onPress={() => forgotPassword()}
        >
          Forgot your password?
        </Text>

        {/* Line with star */}
        <StarSeparator />

        <Button
          text={"Sign In With Google"}
          customButtonStyle={{
            width: "100%",
            height: 50,
            borderRadius: 5,
            justifyContent: "center",
            marginVertical: 10,
            borderWidth: 1,
            borderColor: "#6760FF",
            backgroundColor: "white",
          }}
          customTextStyle={{ color: "black", fontWeight: "700", fontSize: 15 }}
          onPress={() => console.log("Should log with google")}
          icon={<GoogleIconSvg />}
        />
      </View>

      {/* BOTTOM  */}
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 16 }}>Already have an account?</Text>
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("sign-up")}
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },

  textInput: {
    borderWidth: 1,
    borderColor: "#BCCDDC",
    marginTop: 10,
    width: "100%",
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 15,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    marginTop: 10,
    width: 100,
    backgroundColor: "dodgerblue",
  },

  inputsContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    width: "90%",
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    color: "#32325D",
    marginBottom: -5,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
    backgroundColor: "#D54826FF",
  },
  linkText: {
    color: "#6760FF",
    textAlign: "center",
    fontSize: 16,
  },
});

export default SingInScreen;
