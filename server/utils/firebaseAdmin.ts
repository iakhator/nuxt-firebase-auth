import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let firebaseAdmin;

if (!getApps().length) {
  const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS as string);

  firebaseAdmin = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  firebaseAdmin = getApps()[0]; // Use existing instance
}

export const adminAuth = getAuth(firebaseAdmin);
export const adminFirestore = getFirestore(firebaseAdmin);
