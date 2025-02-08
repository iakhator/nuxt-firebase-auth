import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const config = {
    apiKey: "AIzaSyC5YyqMw6QdZ9F0ndk3d_8PR9b42A3BB-A",
    authDomain: "libraryapp-53015.firebaseapp.com",
    projectId: "libraryapp-53015",
    storageBucket: "libraryapp-53015.firebasestorage.app",
    messagingSenderId: "737961832190",
    appId: "1:737961832190:web:ea45b58a6d8e0bb60d3faf",
    measurementId: "G-H44JNPJMBK"
  };

  const firebaseApp = initializeApp(config);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return {
    provide: {
      auth,
      firestore
    }
  };
});
