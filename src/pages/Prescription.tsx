import { useAuth } from "@/hooks/useAuth";
import { getPatientPrescription } from "@/services/useAuth";
import { useEffect, useState } from "react";

export default function Prescription() {

    const {user} = useAuth();

    const [prescription, setPrescription] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    async function handlePrescription() {

        try {
            setIsLoading(true)
            const patPrescibe = await getPatientPrescription(user?.uid);
            // if (!patPrescibe) throw new Error;
            setPrescription(patPrescibe);
        } catch(error) {
            alert(error)
        } finally {
            setIsLoading(false);
        }
        
    }
    useEffect(()=> {
        handlePrescription();
    }, [prescription]);
    return (
        <div>
            <p>From Dr. {prescription?.doctorName}</p>
            <div>You have/had {prescription?.symptoms}</div>
            <div>Analysis indicates you are suffering from {prescription?.illness}</div>
            <div>Prescription: {prescription?.prescribe}</div>
            <div>Your bill is ${prescription?.price}</div>
        </div>
)
}