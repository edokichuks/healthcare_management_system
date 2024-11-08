import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import { useAuth } from "@/hooks/useAuth";
import { db } from "@/firestore/firebase";
import Heading from "./Heading";

const PatientBillChart = () => {
  const { user, role } = useAuth();

  const [totalBills, setTotalBills] = useState(0);
  const [priceRangeData, setPriceRangeData] = useState<any>([]);

  
  const patientDocId = user.uid;
  console.log(patientDocId);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientDocRef = doc(db, "patientList", patientDocId);
        const patientDocSnap = await getDoc(patientDocRef);

        if (patientDocSnap.exists()) {
          const healthArray = patientDocSnap.data().health;
          let total = 0;
          const priceRanges = {
            "0-50": 0,
            "51-100": 0,
            "101-150": 0,
            "151-200": 0,
            "201+": 0,
          };

          healthArray.forEach((entry) => {
            const price = parseFloat(entry.price); // Convert price to a number
            total += price;

            if (price <= 50) {
              priceRanges["0-50"] += 1;
            } else if (price <= 100) {
              priceRanges["51-100"] += 1;
            } else if (price <= 150) {
              priceRanges["101-150"] += 1;
            } else if (price <= 200) {
              priceRanges["151-200"] += 1;
            } else {
              priceRanges["201+"] += 1;
            }
          });

          setTotalBills(total);

          // Format data for Recharts
          const formattedData = Object.keys(priceRanges).map((key) => ({
            name: key,
            value: priceRanges[key],
          }));
          setPriceRangeData(formattedData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [patientDocId]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FFC"];
 console.log(totalBills);
 console.log(priceRangeData);
  return (
    // <div>
    //   <h2>Total Bills Paid: ${totalBills.toFixed(2)}</h2>
    //   <ResponsiveContainer width="100%" height={200}>
    //     <PieChart>
    //       <Pie
    //         data={priceRangeData}
    //         dataKey="value"
    //         nameKey="name"
    //         cx="50%"
    //         cy="50%"
    //         outerRadius={80}
    //         innerRadius={40}
    //         fill="#8884d8"
    //         label
    //       >
    //         {priceRangeData.map((_, index) => (
    //           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //         ))}
    //       </Pie>
    //       <Tooltip />
    //     </PieChart>
    //   </ResponsiveContainer>
    // </div>


<>
      <Heading as="h2">Total Bills Paid: ${totalBills.toFixed(2)}</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie 
            data={priceRangeData}
            nameKey="duration"
            dataKey="value"
            innerRadius={55}
            outerRadius={90}
            cx="50%"
            cy="50%"
            paddingAngle={3}
          >
            {priceRangeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={4}
            iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default PatientBillChart;
