import React from "react";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import { useAuthentication } from "../hooks/useAuthentication";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import { getFirestore } from "firebase/firestore";

export default function Navigation() {
  const user = useAuthentication();
  const firestoreInstance = getFirestore(useFirebaseApp());
  // console.log("user", user);
  // const user = false;

  return (
    <FirestoreProvider sdk={firestoreInstance}>
      {user ? <UserStack /> : <AuthStack />}
    </FirestoreProvider>
  );
}
