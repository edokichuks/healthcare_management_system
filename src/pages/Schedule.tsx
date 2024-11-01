import { Button } from "@/components/ui/button";
import styles from "../styles/components/Schedule.module.scss";
import { useEffect, useState } from "react";
import { getClearPatientSympDatails, getPatientSympDatails, getPrescription } from "@/services/useAuth";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "@/components/SpinnerMini";
import useNavStore from "@/store/NavStore";

function Schedule() {
    const {user, role} = useAuth();
    const [prescribe, setPrescribe] = useState("");
    const [illness, setIllness] = useState("");
    const [sympDetails, setSympDetails] = useState<any>();
    const [loadPres, setLoadPres] = useState(false);

    const [loadSymp, setloadSymp] = useState(true);

    const navigate = useNavigate();

    const activeSideNav = useNavStore((state)=>state.activeSideNav);
    const setActiveSideNav = useNavStore((state)=>state.setActiveSideNav);
    

    async function handleSymptoms() {
        try {
            const data = await getPatientSympDatails(user?.uid);
            if (!data) throw new Error;
            setSympDetails(data);
        } catch (err) {
            toast.error("Error")
        } finally {
            setloadSymp(false);
        }
    }


    useEffect(()=> {
        handleSymptoms();
    }, []);

    async function handlePrescription() {
        setLoadPres(true);
        try {
            await getPrescription({...sympDetails, prescribe, illness});
            await getClearPatientSympDatails(user?.uid);

            toast.success("Prescription sent");
            navigate("/home");
            setActiveSideNav("home")
        } catch {
            toast.error("Network Error. Try again")
        } finally {
            setLoadPres(false);
        }
        
    }

    console.log(sympDetails, user);
    if (loadSymp) return <Spinner />;
    if (Object?.keys(sympDetails).length === 0) return <div>You don't have any appointment at the moment</div>

    return (
        <div className={styles.cont}>
            <p>Patient details</p>

            <div className={styles.cont__gap}>
                <div className={styles.cont__spread}>
                    <div>Name:</div>
                    <div>{sympDetails?.name}</div>
                </div>
                <div className={styles.cont__spread}>
                    <div>Age:</div>
                    <div>{sympDetails?.age}</div>
                </div>
                <div className={styles.cont__spread}> 
                    <div>Blood group:</div>
                    <div>{sympDetails?.bloodGroup}</div>
                </div>
                <div className={styles.cont__spread}>
                    <div>Genotype:</div>
                    <div>{sympDetails?.genotype}</div>
                </div>
                <div className={styles.cont__spread}>
                    <div>Symptoms:</div>
                    <div>{sympDetails?.symptoms}</div>
                </div>
            </div>

            <p>Possible illness</p>
            <input 
            value={illness}
            onChange={(e)=>setIllness(e.target.value)}
            placeholder=" Malaria, diabetes ..." />
            <p>Prescription</p>
            <textarea 
            value={prescribe}
            onChange={(e)=>setPrescribe(e.target.value)} />
            <p></p>
            <Button onClick={handlePrescription}>
                {loadPres? <SpinnerMini /> : "Done"}
            </Button>
        </div>
    )
}

export default Schedule;
            
