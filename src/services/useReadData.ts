import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firestore/firebase";

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});