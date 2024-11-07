import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firestore/firebase";


  export const signUp = async (email: string, password: string, role: string, userName: string): Promise<any> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (role==="doctor") {

    const profile = {
      email: email,
      role: role,
      experience: "5",
      userName: userName,
      qulaification: "MBA"

    }

    const work = {
      available: "yes",
      booked: "yes",
      pending: "no",
    }

    const patDet = {
    }

    const doctorInfo = {
      available: true,
      booked: false,
      userName: userName,
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
  
      const profile = {
        email: email,
        role: role,
        bloodGroup: "O",
        genotype: "AS",
        userName: userName,
  
      }
  
      const billing = {
        amountPaid: 1400,
        totalAmtPaid: 4500,
      }
  
      const patDet = {
        
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

    const userDoc = await getDoc(doc(db, 'doctors', uid, 'profile', uid));
    const userPat = await getDoc(doc(db, 'patients', uid, 'profile', uid));
    console.log(userDoc.data(), "fish");
    // return userDoc.exists() ? userDoc.data().role : null;
    if (userDoc.exists()) return userDoc.data().role;
    if (userPat.exists()) return userPat.data().role;

    console.log("get user")
  }; 

  export const getUserName = async (uid: string): Promise<string | null | undefined> => {

    const userDoc = await getDoc(doc(db, 'doctors', uid, 'profile', uid));
    const userPat = await getDoc(doc(db, 'patients', uid, 'profile', uid));
    console.log(userDoc.data(), "fish");
    // return userDoc.exists() ? userDoc.data().role : null;
    if (userDoc.exists()) return userDoc.data().userName;
    if (userPat.exists()) return userPat.data().userName;

    console.log("get user")

    // console.log(userDoc.data().role || userPat.data().role || "ewww");
  };





  export async function getSelectDoctor(formData: any) {
    const uid = formData.docId;
    await updateDoc(doc(db, 'doctors', uid, 'work', uid, 'schedule', uid), formData);
    await updateDoc(doc(db, 'doctorList', uid), {
      booked: true,
      available: false,
    })

    
  }

  export async function getPatientSympDatails(uid: any) {
    const patientDetails = await getDoc(doc(db, 'doctors', uid, 'work', uid, "schedule", uid));

    console.log(patientDetails.id);
    return patientDetails.data();
  };

  export async function getClearPatientSympDatails(uid: any) {
    await setDoc(doc(db, 'doctors', uid, 'work', uid, "schedule", uid), {});
    await updateDoc(doc(db, 'doctorList', uid), {
      available: true,
      booked: false
    })
  };

  export async function getPrescription(presData: any) {
    const patId = presData.patID;
    await updateDoc(doc(db, 'patients', patId, 'work', patId, "availDocs", patId), presData);

  }

  export const getPatientPrescription = async (uid: string | undefined): Promise<string | null | undefined> => {
    const patPrescribe = await getDoc(doc(db, 'patients', uid, 'work', uid, "availDocs", uid));
    if (patPrescribe.exists()) return patPrescribe.data();
  };

  