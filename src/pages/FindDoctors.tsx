import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
// import { useAuth } from './authContext'; // Your custom hook to get current user
import {useAuth} from '../hooks/useAuth';
import { db } from '../firestore/firebase';
import { getSelectDoctor } from '../services/useAuth';
import toast from 'react-hot-toast';


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
// } from "@/components/ui/table"


const FindDoctors = () => {
  const [doctors, setDoctors] = useState<any>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [render, setRender] = useState(1);
  const { user: currentUser } = useAuth(); // Current patient

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     const db = getFirestore();
  //     const doctorCollection = collection(db, 'doctors');
  //     const doctorSnapshot = await getDocs(doctorCollection);
  //     const doctorList = doctorSnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }));
  //     setDoctors(doctorList);
  //   };

  //   fetchDoctors();
  // }, []);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Reference the 'doctors' collection inside the 'users' collection
        const doctorsCollectionRef = collection(db, 'doctorList');

        //Query only available doctors
        const q = query(doctorsCollectionRef, where("available", "==", true));
        
        // Fetch all the documents in the 'doctors' collection
        // const querySnapshot = await getDocs(doctorsCollectionRef);
        const querySnapshot = await getDocs(q);

        console.log(querySnapshot)
        
        // Map over each document and extract the profile data
        const doctorsList = querySnapshot.docs.map((doc) => {
          return {
            uid: doc.id, // This is the doctor's uid
            ...doc.data() // Spread the profile data
          };
        });

        // const doctorsList = querySnapshot.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data());
        //   return {
        //         uid: doc.id, // This is the doctor's uid
        //         ...doc.data() // Spread the profile data
        //       };
        // });
        
        console.log('List of doctors:', doctorsList);
        setDoctors(doctorsList)
        return doctorsList;
      } catch (error) {
        console.error("Error fetching doctors: ", error);
      }
    };

    fetchDoctors();
  }, [render]);

  const handleSelectDoctor = async () => {
    const db = getFirestore();
    const patientDoc = doc(db, 'patients', currentUser.uid);
    await updateDoc(patientDoc, { selectedDoctor });
  };


async function handlePickDoctor(uid: any) {
  await getSelectDoctor(uid);
  setRender((render)=>render+1);
  toast.success("Session booked successfully");
}
  console.log(doctors);

  return (
    <div>
      <h1>Patient Dashboard</h1>
      <h2>Select Your Doctor:</h2>
      <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)}>
        {doctors.map(doctor => (
          <option key={doctor.uid} value={doctor.email}>
            {doctor.email}
          </option>
        ))}
      </select>
      <button onClick={handleSelectDoctor}>Select Doctor</button>

      {doctors.map((doctor: any)=>
      <p onClick={()=>handlePickDoctor(doctor.uid)}>
        {doctor.email}
      </p>)}

      <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>

    </div>
  );
};

export default FindDoctors;
