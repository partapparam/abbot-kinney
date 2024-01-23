// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
const {
  VITE_APP_FIREBASE_API_KEY,
  VITE_APP_FIREBASE_AUTH_DOMAIN,
  VITE_APP_FIREBASE_PROJECT_ID,
  VITE_APP_FIREBASE_STORAGE_BUCKET,
  VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  VITE_APP_FIREBASE_APP_ID,
  VITE_APP_FIREBASE_MEASUREMENT_ID,
} = import.meta.env

// Other SDKs for Firebase products
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${VITE_APP_FIREBASE_API_KEY}`,
  authDomain: `${VITE_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${VITE_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${VITE_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${VITE_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${VITE_APP_FIREBASE_APP_ID}`,
  measurementId: `${VITE_APP_FIREBASE_MEASUREMENT_ID}`,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const authentication = getAuth(app)

export default app
