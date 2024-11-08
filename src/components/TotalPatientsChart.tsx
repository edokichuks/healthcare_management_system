import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format, startOfWeek, addWeeks, isSameWeek } from "date-fns";
import { db } from "@/firestore/firebase";
import Heading from "./Heading";

const TotalPatientChart = () => {
  const [weeklyVisitsData, setWeeklyVisitsData] = useState<any>([]);
  const [load, setLoad] = useState<any>(false);

  useEffect(() => {
    const fetchWeeklyVisits = async () => {
      try {
        setLoad(true);
        const patientListRef = collection(db, "patientList");
        const snapshot = await getDocs(patientListRef);

        // Initialize an empty object to store visit counts per week
        const weeklyVisits = {};

        snapshot.forEach((doc) => {
          const data = doc.data();
          const visitDate = data.health[0].timestamp?.toDate(); // Convert Firestore Timestamp to JS Date

          if (visitDate) {
            // Get the start of the week for each visit
            const weekStart = format(startOfWeek(visitDate, { weekStartsOn: 1 }), "yyyy-MM-dd");

            // Increment the visit count for this week
            if (weeklyVisits[weekStart]) {
              weeklyVisits[weekStart] += 1;
            } else {
              weeklyVisits[weekStart] = 1;
            }
          }
        });

        // Convert weekly visits object to an array for Recharts
        const formattedData = Object.keys(weeklyVisits).map((weekStart) => ({
          week: weekStart,
          patients: weeklyVisits[weekStart],
        }));

        setWeeklyVisitsData(formattedData);
      } catch (error) {
        console.error("Error fetching weekly visits:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchWeeklyVisits();
  }, []);

  if (load===true) return <div>fghjklS</div>

  console.log(weeklyVisitsData);

  return (
    <>
        <Heading as="h2">Weekly number of patients</Heading>
        <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyVisitsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="patients" fill="#82ca9d" barSize={60} /> {/* Adjust barSize to control width */}
            </BarChart>
        </ResponsiveContainer>
    </>
  );
};

export default TotalPatientChart;
