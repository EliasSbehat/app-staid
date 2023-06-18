import { StyleSheet, TouchableOpacity } from "react-native";
import { auth, storage } from "../config/firebase";
import { getMetadata, ref, uploadBytesResumable } from "firebase/storage";
import uuid from "react-native-uuid";

import { Text, View } from "../components/Themed";
import CameraPreview from "../components/CameraPreview";
import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import LoadingOverlay from "../components/LoadingOverlay";
import { SafeAreaView } from "react-native-safe-area-context";
import TopMenu from "../components/TopMenu";
import Button from "../components/Button";

export default function CameraPreviewScreen({ navigation, route }: any) {
  const imgPreview = route.params.params;

  const [loaderData, setLoaderData] = useState<any>({
    loading: false,
    text: "Processing Image",
  });

  const uploadImage = async () => {
    setLoaderData({
      loading: true,
      text: "Uploading image...",
    });

    const randomId = uuid.v4(); //Random Id for the image
    const imageRef = ref(storage, `${auth.currentUser?.uid}/${randomId}`); //How the image will be stored, using uuid to get random id

    //convert image to array of bytes
    const img = await fetch(imgPreview.uri);
    const bytes = await img.blob();

    console.log("RID2", randomId);
    //TODO: Remember you can add an option to get a base64 string on expo camera takePyctureAsysnc
    const uploadTask = uploadBytesResumable(imageRef, bytes);

    uploadTask.on(
      "state_changed",
      null,
      (err) => console.log(err),
      async () => {
        // download url
        const metadata = await getMetadata(uploadTask.snapshot.ref);
        convertImageToText(
          `gs://${metadata.bucket}/${auth.currentUser?.uid}/${randomId}`
        );
      }
    );

    const convertImageToText = async (storagePath: string) => {
      setLoaderData({
        loading: true,
        text: "Recognizing text...",
      });
      const functions = getFunctions();
      const image2text = httpsCallable(functions, "image2text");
      image2text({
        image: storagePath,
      })
        .then((result: any) => {
          console.log("image2text result", result);
          if (result.data.status == "success") {
            navigation.navigate("ConfirmationScreen", {
              params: result.data.ocrOutput,
            });
          } else {
            console.log("We couldn't process the image. Please try again.");
          }
        })
        .catch((error) => console.log("error", error));
    };
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <TopMenu title={"Confirm Image"} />
        <CameraPreview photo={imgPreview} />
        <View style={styles.bottomOptions}>
          <Button
            onPress={navigation.goBack}
            text={"Cancel"}
            type="transparent"
            size="lg"
          />
          <Button
            onPress={uploadImage}
            text={"Process Image"}
            customButtonStyle={styles.confirmButton}
            customTextStyle={styles.confirmButtonText}
            size="lg"
            icon="chevron-right"
            iconAlignment="right"
          />
        </View>
      </SafeAreaView>

      <LoadingOverlay {...loaderData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  content: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "red",
    // backgroundColor: "blue",
    width: "100%",
    justifyContent: "space-between",
  },
  bottomOptions: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  confirmButton: {},
  confirmButtonText: {},
});
