import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb0DIKjvTJrzoLzKyKbMc_vIEPMkpRPF4",
  authDomain: "portfolio-samit.firebaseapp.com",
  projectId: "portfolio-samit",
  storageBucket: "portfolio-samit.firebasestorage.app",
  messagingSenderId: "969694666802",
  appId: "1:969694666802:web:121c2b05d060d96aa01c2b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;
