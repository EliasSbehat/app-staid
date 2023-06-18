import "dotenv/config";

export default {
  expo: {
    name: "staid",
    slug: "staid",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    plugins: [
      ["expo-media-library"],
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera.",
          photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
          microphonePermission:
            "Allow $(PRODUCT_NAME) to access your microphone.",
          savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
          isAccessMediaLocationEnabled: true,
        },
      ],
      ["expo-image-picker"],
      ["expo-document-picker"],
    ],
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.rworks.staid",
    },
    android: {
      package: "com.staidapp.demo",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      eas: {
        projectId: "8667aadb-4522-4ce0-b461-27ba27815acc",
      },
    },
  },
};
