import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Heading from './Heading';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firestore/firebase';

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PatientChart() {
  const [ageGroupData, setAgeGroupData] = useState<any>([]);
 const [load, setLoad] = useState<any>(false);

  useEffect(() => {
    const fetchAgeGroups = async () => {
      try {
        setLoad(true);
        const patientListRef = collection(db, "patientList");
        const snapshot = await getDocs(patientListRef);
  
        const ageGroups = { "0-12": 0, "13-18": 0, "19-25": 0, "26-100": 0 };
  
        snapshot.forEach((doc) => {
          const data = doc?.data();
          const age = data.health[0].age;

          console.log(age, data);
  
          if (age >= 0 && age <= 12) {
            ageGroups["0-12"] += 1;
          } else if (age >= 13 && age <= 18) {
            ageGroups["13-18"] += 1;
          } else if (age >= 19 && age <= 25) {
            ageGroups["19-25"] += 1;
          } else if (age >= 26 && age <= 100) {
            ageGroups["26-100"] += 1;
          }
        });
  
        const formattedData = Object.keys(ageGroups).map((key) => ({
          name: key,
          value: ageGroups[key],
        }));
  
        setAgeGroupData(formattedData); // Update the state with the age groups
      } catch (error) {
        console.error("Error fetching patient ages:", error);
      } finally {
        setLoad(false)
      }
    };
  
    fetchAgeGroups();
    // console.log(age, data);
  }, []);

  console.log(ageGroupData);

    if (load===true) return <div>fghjklS</div>
  
    return (
    //   <PieChart width={800} height={400} >
    //     <Pie
    //       data={data}
    //       cx={120}
    //       cy={200}
    //       innerRadius={60}
    //       outerRadius={80}
    //       fill="#8884d8"
    //       paddingAngle={5}
    //       dataKey="value"
    //     >
    //       {data.map((entry, index) => (
    //         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //       ))}
    //     </Pie>
    // </PieChart>
    <>
      <Heading as="h2">Age of patients</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie 
            data={ageGroupData}
            nameKey="duration"
            dataKey="value"
            innerRadius={65}
            outerRadius={100}
            cx="50%"
            cy="50%"
            paddingAngle={3}
          >
            {ageGroupData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="25%"
            layout="vertical"
            iconSize={5}
            iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </>
    );
}
