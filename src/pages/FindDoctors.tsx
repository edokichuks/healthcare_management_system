import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
// import { useAuth } from './authContext'; // Your custom hook to get current user
import {useAuth} from '../hooks/useAuth';
import { db } from '../firestore/firebase';
import { getSelectDoctor } from '../services/useAuth';
import toast from 'react-hot-toast';
import styles from "../styles/components/FindDoctor.module.scss";
import Modal from "../components/Modal";
import ConfirmDelete from "../components/ConfirmDelete";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import Symptoms from '@/components/Symptoms';
// } from "@/components/ui/table"


const FindDoctors = () => {
  const [doctors, setDoctors] = useState<any>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [render, setRender] = useState(1);
  const { user: currentUser } = useAuth(); // Current patient


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


async function handlePickDoctor(formData: any) {
  await getSelectDoctor(formData.docId);
  setRender((render)=>render+1);
  toast.success("Session booked successfully");
}
  console.log(doctors);

  return (
    <div className={styles.cont}>
      <div>
     { doctors.length>0 && <Table>
        <TableCaption>See available doctors</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="w-[100px]">Experience</TableHead>
            <TableHead className="w-[180px]">Email</TableHead>
            <TableHead className="text-right">Available</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map(doctor=>

          <Modal>
          <Modal.Open opens="delete">
            <TableRow className={styles.select}>
            {/* <TableRow onClick={()=>handlePickDoctor(doctor.uid)} className={styles.select}> */}
              <TableCell className="font-medium">Dr. {doctor.userName}</TableCell>
              <TableCell>6 yrs</TableCell>
              <TableCell className="font-medium">{doctor.email}</TableCell>
              <TableCell className="text-right">Yes</TableCell>
            </TableRow>
          </Modal.Open>
          <Modal.Window name="delete">
            <Symptoms resourceName="Input your symptoms"
            doctorName={doctor.userName}
            // onConfirm={handlePickDoctor}
            docId={doctor.uid}
            setRender={setRender}
            render={render} />
          </Modal.Window>
          </Modal>


  )
          }
        </TableBody>
      </Table>}

      {doctors.length === 0 && <div>Oops.. No doctor available</div>}
      </div>


    </div>
  );
};

export default FindDoctors;
