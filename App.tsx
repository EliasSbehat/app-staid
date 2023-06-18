import React from "react";
import { firebaseConfig, storage } from "./config/firebase";
import { FirebaseAppProvider, StorageProvider } from "reactfire";
import RootNavigation from "./navigation";

export default function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <StorageProvider sdk={storage}>
        <RootNavigation />
      </StorageProvider>
    </FirebaseAppProvider>
  );
}
