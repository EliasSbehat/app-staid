import { useState, useRef, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  useWindowDimensions,
  Animated,
} from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";
import { auth } from "../config/firebase";
import { StatusBar } from "expo-status-bar";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from 'expo-image-picker';

import PromptSliderBottomTabs from "../components/PromptSliderBottomTabs";
import TopMenu from "../components/TopMenu";
import ImagePromptSlide from "../components/ImagePromptSlide";
import TextPromptSlide from "../components/TextPromptSlide";
import AnimatedOverlay from "../components/AnimatedOverlay";
import Colors from "../constants/Colors";

export default function PromptCaptureSlider({ navigation }: any) {
  let cameraRef: any = useRef();
  const isFocused = useIsFocused();

  const [hasCameraPermission, setHasCameraPermission] = useState<any>();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState<any>();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermissions =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(
        mediaLibraryPermissions.status === "granted"
      );
    })();
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);
  const [isCameraReady, setIsCameraReady] = useState(false);
  // const [capturedImage, setCapturedImage] = useState<any>(null);

  // const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(width)).current;
  const slidesRef: any = useRef(null); // TODO: add type

  const onScrollComplete = (event: any) => {
    const index: number = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
    Keyboard.dismiss();
  };

  // Function to scroll to a specific slide
  const scrollTo = (XPosition: number) => {
    if (slidesRef.current != null) {
      slidesRef.current.scrollTo({ x: XPosition });
    }
  };

  // Function to toggle between front and back camera
  const toggleCameraType = () => {
    if (cameraType === CameraType.back) {
      setCameraType(CameraType.front);
      setFlashMode(FlashMode.off);
    } else {
      setCameraType(CameraType.back);
    }
  };

  // Function to toggle between flash modes
  const toggleFlashMode = () => {
    if (flashMode === FlashMode.off && cameraType === CameraType.back) {
      setFlashMode(FlashMode.torch);
    } else {
      setFlashMode(FlashMode.off);
    }
  };

  const navigateToDocs = () => {
    navigation.navigate("DocumentListScreen");
  };
  const navigateTo = (route: string, params: any) => {
    navigation.navigate(route, { params });
  };

  // Function to take a picture
  const takePicture = async () => {
    if (!isCameraReady) return;
    const photo = await cameraRef.current.takePictureAsync();
    if (photo.width < 900) {
      navigateTo("CameraPreviewScreen", photo);
    } else {
      const compressedPhoto = await manipulateAsync(
        photo.uri,
        [{ resize: { width: 1000 } }],
        {
          compress: 0,
          format: SaveFormat.JPEG,
        }
      );
      navigateTo("CameraPreviewScreen", compressedPhoto);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(image);

    if (!image.canceled) {
      console.log("imagex picked: ", image.assets[0].uri);
      if (image.assets[0].width < 900) {
        navigateTo("CameraPreviewScreen", image);
      } else {
        const compressedImage = await manipulateAsync(
          image.assets[0].uri,
          [{ resize: { width: 1000 } }],
          {
            compress: 0,
            format: SaveFormat.JPEG,
          }
        );
        navigateTo("CameraPreviewScreen", compressedImage);
      }
    }
  };

  //CHANGED PERMISIONS ON CONSOLE, DONT DO!

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text> Permissions denied, change in settings </Text>;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={"height"}>
      {isFocused && (
        <>
          <Camera
            ref={cameraRef}
            style={styles.cameraBackground}
            type={cameraType}
            flashMode={flashMode}
            onCameraReady={() => setIsCameraReady(true)}
          />
          <AnimatedOverlay scrollX={scrollX} />
          <LinearGradient
            style={styles.cameraGradientOverlay}
            colors={["transparent", Colors.dark.primary]}
            locations={[0.6, 1]}
          />
          <SafeAreaView>
            <View style={styles.topMenuContainer}>
              <TopMenu
                title={slideTitlesDictionary[currentIndex]}
                handleRightButtonPress={() => navigateToDocs()}
                handleLeftButtonPress={() => auth.signOut()}
              />
            </View>

            <View style={styles.sliderContainer}>
              <Animated.ScrollView
                style={styles.ScrollView}
                horizontal
                pagingEnabled
                bounces={false}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                  { useNativeDriver: true }
                )}
                scrollEventThrottle={32}
                ref={slidesRef}
                contentOffset={{ x: width, y: 0 }}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
                onMomentumScrollEnd={onScrollComplete}
              >
                {/* Text Prompt */}
                <SlideWrapper>
                  <TextPromptSlide navigateTo={navigateTo} />
                </SlideWrapper>
                {/* Image Prompt */}
                <SlideWrapper>
                  <ImagePromptSlide
                    toggleCameraType={toggleCameraType}
                    flashMode={flashMode}
                    toggleFlashMode={toggleFlashMode}
                    uploadImage={pickImage}
                  />
                </SlideWrapper>
                {/* Audio Prompt */}
                <SlideWrapper>
                  <Text style={{ color: "white" }}>Slide 3</Text>
                </SlideWrapper>
              </Animated.ScrollView>
            </View>

            <View style={styles.bottomTabsContainer}>
              <PromptSliderBottomTabs
                scrollX={scrollX}
                scrollTo={scrollTo}
                currentIndex={currentIndex}
                handleTakePicture={takePicture}
              />
            </View>
          </SafeAreaView>
          <StatusBar style="light" />
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const SlideWrapper = ({ children }: any) => {
  const { width } = useWindowDimensions();
  return <View style={[styles.SlideWrapper, { width }]}>{children}</View>;
};

const styles = StyleSheet.create({
  cameraBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  cameraGradientOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    bottom: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    // borderWidth: 1,
    // borderColor: "red",
    // backgroundColor: "blue",
  },
  sliderContainer: {
    flex: 10,
    // borderWidth: 1,
    // borderColor: "blue",
  },
  SlideWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    // backgroundColor: "red",
  },
  bottomTabsContainer: {
    // flex: 1,
    height: 100,
  },
  topMenuContainer: {
    height: 40,
    // backgroundColor: "green",
    // flex: 1,
  },
  ScrollView: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: "white",
  },
});

interface SlideTitlesDictionary {
  [key: number]: string;
}
const slideTitlesDictionary = {
  0: "Text",
  1: "Image",
  2: "Audio",
} as SlideTitlesDictionary;
