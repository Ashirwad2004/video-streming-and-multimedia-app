import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDHvJQRZk9QiWDHHGKq_vE3XGY9FmQv-Rk",
  authDomain: "video-streaming-demo-123.firebaseapp.com",
  projectId: "video-streaming-demo-123",
  storageBucket: "video-streaming-demo-123.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789jkl"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);