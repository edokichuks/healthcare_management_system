import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firestore/firebase";
import { useId } from "react";

// export const signUp = async (email: string, password: string, role: string): Promise<User> => {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;
//     await setDoc(doc(db, 'users', user.uid), { email, role });
//     return user;
//   };
  
//   export const signIn = async (email: string, password: string): Promise<User> => {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user;
//   };

  export const signUp = async (email: string, password: string, role: string): Promise<any> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (role==="doctor") {
    // await setDoc(doc(db, 'users', user.uid), { email, role });

    let profile = {
      email: email,
      role: role,
      experience: "5",
      qulaification: "MBA"

    }

    let work = {
      available: "yes",
      booked: "yes",
      pending: "no",
    }

    let patDet = {
      name: "Pat",
      id: "id"
    }

    let doctorInfo = {
      available: true,
      booked: false,
      // pending: false,
      email: email,
      role: role,
      experience: "5",
      qulaification: "MBA"
    }

    await setDoc(doc(db, 'doctors', user.uid, 'profile', user.uid), profile);
    await setDoc(doc(db, 'doctors', user.uid, 'work', user.uid), work);
    await setDoc(doc(db, 'doctors', user.uid, 'work', user.uid, 'schedule', user.uid), patDet);
    await setDoc(doc(db, 'doctorList', user.uid), doctorInfo);
    }

    if (role==="patient") {
      // await setDoc(doc(db, 'users', user.uid), { email, role });
  
      let profile = {
        email: email,
        role: role,
        bloodGroup: "O",
        genotype: "AS"
  
      }
  
      let billing = {
        amountPaid: 1400,
        totalAmtPaid: 4500,
      }
  
      let patDet = {
        name: "Pat",
        id: "id"
      }
  
      await setDoc(doc(db, 'patients', user.uid, 'profile', user.uid), profile);
      await setDoc(doc(db, 'patients', user.uid, 'work', user.uid, 'billings', user.uid), billing);
      await setDoc(doc(db, 'patients', user.uid, 'work', user.uid, 'availDocs', user.uid), patDet);
    };
    return user;
  };

  
  
  export const signIn = async (email: string, password: string): Promise<any> => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };
  
  export const logOut = async (): Promise<void> => {
    await signOut(auth);
  };
  
  export const getUserRole = async (uid: string): Promise<string | null | undefined> => {
    // const userDoc = await getDoc(doc(db, 'users', uid));
    let status = "patients" || "doctors";
    // const userDoc = await getDoc(doc(db, 'users', uid));
    const userDoc = await getDoc(doc(db, 'doctors', uid, 'profile', uid));
    const userPat = await getDoc(doc(db, 'patients', uid, 'profile', uid));
    console.log(userDoc.data(), "fish");
    // return userDoc.exists() ? userDoc.data().role : null;
    if (userDoc.exists()) return userDoc.data().role;
    if (userPat.exists()) return userPat.data().role;

    console.log(userDoc.data().role || userPat.data().role || "ewww");
  }; 


  export async function getSelectDoctor(uid: any) {
    // await updateDoc(doc(db, 'doctors', uid, 'work', uid), {
    //   booked: true, 
    //   available: false,
    // })

    await updateDoc(doc(db, 'doctorList', uid), {
      available: false,
      booked: true
    })
  }