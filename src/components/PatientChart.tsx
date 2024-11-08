import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Heading from './Heading';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PatientChart() {
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
      <Heading as="h2">Bills</Heading>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie 
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={70}
            outerRadius={100}
            cx="50%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={10}
            iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </>
    );
}
