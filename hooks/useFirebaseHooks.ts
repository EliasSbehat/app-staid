import { auth, db } from "../config/firebase";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,

} from "firebase/firestore";

export const addToDatabase = () => {
    const user = auth.currentUser;
    if (user) {
      const userInfo = {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      };

      const userRef = doc(db, "users", userInfo.uid);
      setDoc(userRef, userInfo)
        .then((param) => {
          // console.log(param);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    alert("Added!");
  };

  export const addSubCollection = (content: string, callback: any) => {
    const user = auth.currentUser;

    if (user) {
      const docRef = collection(db, "users");
      addDoc(collection(docRef, user.uid, "documents"), {
        content: content,
      })
        .then((param) => {
          // console.log(param);
          callback()
        })
        .catch((error) => {
          console.log(error);
        });
    }

    alert("Enjoy your subcollection");
  };

  export const getData = async () => {
    const user = auth.currentUser;

    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      const subCollectionRef = collection(db, "users", user.uid, "documents");
      const snapshot = await getDocs(subCollectionRef);
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
    }

    alert("Here is your document babe ;)");
  };

export const addTextPromptDoc = (title: string, content: string, callback: any) => {
  const user = auth.currentUser;

    if (user) {
      const docRef = collection(db, "users");
      addDoc(collection(docRef, user.uid, "documents"), {
        title: title,
        seen: false,
        status: "processing",
        content: content,
        createdAt: new Date(),
        promptType:"text",
        imageAssetId: null,
      })
        .then((param) => {
          // console.log(param);
          callback()
        
        })
        .catch((error) => {
          console.log(error);
        });
  }

  alert("Added!");
}