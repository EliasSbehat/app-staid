import React from "react";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";
import StarSeparator from "../components/StarSeparator";
import Button from "../components/Button";
import InputWithLabel from "../components/inputWithLabel/InputWithLabel";
import StaidLogoHeader from "../components/StaidLogoHeader";
import { useState } from "react";

const SignUpScreen = ({ navigation }: any) => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
  });
  const [userInfo, setUserInfo] = useState<any>();
  //TODO: Fix view, not centered on Sign Up screen and SignIn screen
  async function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      ).then((userCreds) => {
        setUserInfo(userCreds);
        const user = userCreds.user;

        updateProfile(user, { displayName: value.name })
          .then(() => {
            console.log("Name changed!!!");
            sendEmailVerification(user)
              .then(() => console.log("Email verification sent!"))
              .catch((error) => console.log("Algo salio mal...", error));
          })
          .catch((error) => console.log("Woops... ", error));
      });
    } catch (error: any) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  // console.log(userInfo?.user);
  console.log(auth.currentUser);
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
          placeholder=""
          labelName="Name"
          value={value.name}
          handleChange={(text) => setValue({ ...value, name: text })}
        />
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
          text={"Sign Up"}
          customButtonStyle={{
            width: "100%",
            height: 50,
            borderRadius: 5,
            justifyContent: "center",
            marginVertical: 10,
            backgroundColor: "#6760FF",
          }}
          customTextStyle={{ fontWeight: "700", fontSize: 15 }}
          onPress={() => signUp()}
        />

        {/* Line with star */}
        <StarSeparator />

        <Button
          text={"Sign Up With Google"}
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
        />
      </View>

      {/* BOTTOM  */}
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 16 }}>Already have an account?</Text>
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("sign-in")}
        >
          Sign In
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

export default SignUpScreen;
