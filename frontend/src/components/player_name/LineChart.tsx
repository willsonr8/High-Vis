import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function RenderLineChart({ rows, selectionKey, selectionLabel }) {
  const yAxisDomain = [
    0,
    Math.max(...rows.map(row => (row[selectionKey] as number) || 0)) + 5,
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
          width={500}
          height={300}
          data={rows}
          margin={{
            top: 50,
            right: 20,
            left: 20,
            bottom: 20,
          }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="week" label={{
          value: "Game Week",
          position: "insideBottom",
          offset: -5,
          style: {marginTop: 8}
        }}/>
        <YAxis dataKey={selectionKey} domain={yAxisDomain} type="number" allowDataOverflow label={{
          value: selectionLabel,
          angle: -90,
          position: 'insideLeft',
          style: {textAnchor: 'middle'}
        }}
        />
        <Tooltip/>
        <Line type="monotone" dataKey={selectionKey} labelHidden stroke="#8884d8" activeDot={{r: 8}}/>
        <text x={"50%"} y={"5%"} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={16} fontWeight="500">
            {`${selectionLabel} by Game Week`}
        </text>
      </LineChart>
    </ResponsiveContainer>
  );
}
